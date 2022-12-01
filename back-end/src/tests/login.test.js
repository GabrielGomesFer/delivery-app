const sinon = require("sinon");

const chai = require("chai");

const chaiHttp = require("chai-http");

const app = require("../api/app");
const { User } = require("../database/models");

chai.use(chaiHttp);

const { expect } = chai;
//        email: 'zebirita@email.com',
//        password: '1c37466c159755ce1fa181bd247cb925' certa $#zebirita#$,
// 'Cliente Zé Birita', 'zebirita@email.com', customer

describe("Rota /Login", () => {

  afterEach(() => sinon.restore());

  it("quando o email está errado", async () => {
    sinon.stub(User, "findOne").resolves(null);

    const httpResponse = await chai.request(app)
    .post("/login")
    .send({ email: "zebirita@ea.com", password: "$#zebirita#$" });

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({
      message: "Incorrect email or password",
    });
  });

  it('quando a senha está errada', async () => {
    sinon.stub(User, "findOne").resolves(null);

    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'zebirita@email.com', password: '$#zebir#$', })
       expect(httpResponse.status).to.equal(404);
       expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })

  it('Login válido', async () => {
    sinon.stub(User, "findOne").resolves({
      name: "Cliente Zé Birita",
      role: "customer",
      email: "zebirita@email.com",
      password: "1c37466c159755ce1fa181bd247cb925",
    });

    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'zebirita@email.com', password: '$#zebirita#$', })
       expect(httpResponse.status).to.equal(200);
       expect(httpResponse.body).to.have.property('token');
  })
});
