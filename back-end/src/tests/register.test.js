const sinon = require("sinon");

const chai = require("chai");

const jwt = require("jsonwebtoken");
// import * as chai from 'chai';

const chaiHttp = require("chai-http");

const app = require("../api/app");
const { User } = require("../database/models");

chai.use(chaiHttp);

const { expect } = chai;

const { validToken } = require('./mocks/token')
describe("Rota /Register", () => {

  afterEach(() => sinon.restore());

  it("quando o email já existe", async () => {
    sinon.stub(User, "findOne").resolves({dataValues: {
      id: 4,
      name: "Cliente Teste",
      role: "customer",
      email: "zebirita@email.com",
      password: "1c37466c159755ce1fa181bd247cb925",
    }});

    const httpResponse = await chai.request(app).post("/user/register").send({
      name: "Cliente Teste",
      email: "zebirita@email.com",
      password: "123456",
    });
    expect(httpResponse.status).to.equal(409);
    expect(httpResponse.body).to.be.deep.equal({
      message: "User already registered",
    });
  });

  it("register válido", async () => {
    sinon.stub(User, "findOne").resolves();
    sinon.stub(User, "create").resolves({dataValues: {
      id: 4,
      name: "Cliente Teste",
      role: "customer",
      email: "cliente@teste.com",
      password: "1c37466c159755ce1fa181bd247cb925",
    }});

    const httpResponse = await chai.request(app).post("/user/register").send({
      name: "Cliente Teste1",
      email: "cliente@testes.com",
      password: "$#zebirita#$",
    });
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.have.property("token");
  });

  it("you shall not pass", async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    const httpResponse = await chai.request(app)
    .post("/user/register")
    .send({
      name: "Cliente Teste",
      email: "zebirita@email.com",
      password: "123456",
    }).set("Authorization", validToken);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({
      message: "You shall not pass!",
    });
  });
});
