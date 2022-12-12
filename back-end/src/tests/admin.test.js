const sinon = require("sinon");

const chai = require("chai");

const jwt = require("jsonwebtoken");

const chaiHttp = require("chai-http");

const app = require("../api/app");
const { User } = require("../database/models");

chai.use(chaiHttp);

const { expect } = chai;

const { admToken } = require("./mocks/admToken");
const { mockUsers, mockCustomer } = require("./mocks/mockUsers")

describe("Rota /user/register do ADMIN", () => {
  afterEach(() => sinon.restore());
  describe("POST ADM", () => {
    it("quando o email já existe", async () => {
      sinon.stub(User, "findOne").resolves({
        dataValues: {
          id: 4,
          name: "Cliente Teste",
          role: "customer",
          email: "zebirita@email.com",
          password: "1c37466c159755ce1fa181bd247cb925",
        },
      });

      const httpResponse = await chai
        .request(app)
        .post("/user/register")
        .send({
          name: "Cliente Teste",
          email: "zebirita@email.com",
          password: "123456",
          role: "seller",
        })
        .set("Authorization", admToken);
      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.be.deep.equal({
        message: "User already registered",
      });
    });

    it("register válido", async () => {
      sinon.stub(User, "findOne").resolves();
      sinon.stub(User, "create").resolves({
        dataValues: {
          id: 4,
          name: "Cliente Teste",
          role: "customer",
          email: "cliente@teste.com",
          password: "1c37466c159755ce1fa181bd247cb925",
        },
      });

      const httpResponse = await chai.request(app).post("/user/register").send({
        name: "Cliente Teste1",
        email: "cliente@testes.com",
        password: "$#zebirita#$",
        role: "customer",
      });
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.have.property("token");
    });
  });

  describe('GET ADM', () => {
    it('get all users', async () => {
        sinon.stub(User, "findAll").resolves(mockUsers);

        const httpResponse = await chai
        .request(app)
        .get("/user")
        .set("Authorization", admToken);

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(mockUsers);
    })

    it('get only customers', async () => {
        sinon.stub(User, "findAll").resolves(mockCustomer);

        const httpResponse = await chai
        .request(app)
        .get("/user")
        .query({ role: 'customer' })
        .set("Authorization", admToken);

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(mockCustomer);
    })
  })

  describe('DELETE User', () => {
    it('Delete a user with success', async () => {
        sinon.stub(User, "findOne").resolves(mockCustomer);

        const httpResponse = await chai.request(app).delete("/user/3")
        .set("Authorization", admToken);

        expect(httpResponse.status).to.equal(204);
        expect(httpResponse.body).to.be.deep.equal({});
    })

    it('User not found on delete', async () => {
        sinon.stub(User, "findOne").resolves();

        const httpResponse = await chai.request(app).delete("/user/99")
        .set("Authorization", admToken);

        expect(httpResponse.status).to.equal(404);
        expect(httpResponse.body).to.be.deep.equal({ message: "User not found" });
    });
  });
});
