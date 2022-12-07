const sinon = require("sinon");

const chai = require("chai");

const jwt = require("jsonwebtoken");
// import * as chai from 'chai';

const chaiHttp = require("chai-http");

const app = require("../api/app");
const { User, Product, Sale, SaleProduct } = require("../database/models");

chai.use(chaiHttp);

const { expect } = chai;

const sellerToken = require("./mocks/sellerToken");

const mockedProducts = [
    // {
    //     id: 1,
    //     name: 'Skol Lata 250ml',
    //     price: 2.20,
    //     url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg'
    // },
    {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3001/images/heineken_600ml.jpg'
    },
    {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg' 
    }
];

const mockedSend = {
  dataValues: {
     id: 1,
     userId: 1,
     sellerId: 2,
     totalPrice: 9.99,
     deliveryAddress: 'rua dos bobos',
     deliveryNumber: '0',
     saleDate: 06-12-2022,
     status: 'Pendente',
 }
};

const mockedSeller = {
    name: "Fulana Pereira",
    role: "seller",
    email: "fulana@deliveryapp.com",
    password: "3c28d2b0881bf46457a853e0b07531c6",
  }

const mockedUser = { dataValues: {
  name: "Cliente Zé Birita",
  role: "customer",
  email: "zebirita@email.com",
}
}
  

const mockStubProducts = [{productId: 2, quantity: 1}, {productId: 3, quantity: 1}]

describe("Rota /sales", () => {
  afterEach(() => sinon.restore());

  it("Erro de token seller", async () => {
    const httpResponse = await chai.request(app)
    .post("/sales")
    .send({
        totalPrice: 9.99,
        deliveryAddress: 'rua dos bobos',
        deliveryNumber: '0',
        productIds: [2, 3],
      });

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: "Token not found" });
  });

  //   (2, 'Fulana Pereira', 'fulana@deliveryapp.com', '3c28d2b0881bf46457a853e0b07531c6', 'seller'), -- senha: md5('fulana@123')
  it("post /sales feito com sucesso", async () => {
    const createdSaleMock = {
     dataValues: {
        id: 1,
        userId: 1,
        sellerId: 2,
        totalPrice: 9.99,
        deliveryAddress: 'rua dos bobos',
        deliveryNumber: '0',
        saleDate: 06-12-2022,
        status: 'Pendente',
    }
  };

    sinon.stub(User, "findOne").resolves(mockedUser);
    sinon.stub(User, "findByPk").resolves(mockedSeller);
    sinon.stub(Product, "findByPk").resolves(mockedProducts);
    sinon.stub(Sale, "create").resolves(createdSaleMock);
    sinon.stub(SaleProduct, "bulkCreate").resolves();
    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .post("/sales")
    .send({
        totalPrice: 9.99,
        sellerid: 2,
        deliveryAddress: 'rua dos bobos',
        deliveryNumber: '0',
        productIds: [{productId: 2, quantity: 1}, {productId: 3, quantity: 1}],
      }).set("Authorization", sellerToken);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal({ 'saleId': 1 });
  });

  it("post /sales produto não encontrado", async () => {

    
    sinon.stub(User, "findOne").resolves(mockedSeller);
    sinon.stub(Product, "findByPk").resolves();
    sinon.stub(Sale, "create").resolves(mockedSend);

    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .post("/sales")
    .send({
        totalPrice: 9.99,
        sellerid: 2,
        deliveryAddress: 'rua dos bobos',
        deliveryNumber: '0',
        productIds: [4],
      }).set("Authorization", sellerToken);

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Some product not found'  });
  });

  it("post /sales email não encontrado", async () => {

    
    sinon.stub(User, "findOne").resolves();
    sinon.stub(Product, "findByPk").resolves(mockStubProducts);
    sinon.stub(SaleProduct, "create").resolves(mockedSend);

    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .post("/sales")
    .send({
        totalPrice: 9.99,
        sellerid: 5,
        deliveryAddress: 'rua dos bobos',
        deliveryNumber: '0',
        productIds: [4],
      }).set("Authorization", sellerToken);

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Seller not found!'  });
  });

  it("get /sales/:id funcionando", async () => {

    sinon.stub(Sale, "findOne").resolves(mockedSend);

    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .get("/sales/1")
    .set("Authorization", sellerToken);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(mockedSend);
  });

  it("get /sales/:id id não encontrado", async () => {

    sinon.stub(User, "findOne").resolves();

    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .get("/sales/12584999")
    .set("Authorization", sellerToken);

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Sale not found!'  });
  });

  it("get /sales/:id token inválido", async () => {

    sinon.stub(User, "findOne").resolves();

    sinon.stub(jwt, 'verify').resolves(false);

    const httpResponse = await chai.request(app)
    .get("/sales/1");

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: "Token not found" });    
  });
});
