const sinon = require("sinon");

const chai = require("chai");

// import * as chai from 'chai';

const chaiHttp = require('chai-http');

const { app } = require('../api/app')
const User = require('../database/models/User');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /Register', () => {

    beforeEach(async () => {
        sinon
          .stub(User, "findOne")
          .resolves({
            name: 'Cliente Teste',
            role: 'customer',
            email: 'cliente@teste.com',
            password: '123456'
          });
      });

    it('quando o email já existe', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/register')
           .send({ name: 'Cliente Teste', email: 'zebirita@email.com', password: '123456', })
           expect(httpResponse.status).to.equal(409);
           expect(httpResponse.body).to.be.deep.equal({ message: 'User alredy registered' });
      })

      it('quando o name está menor do que 12 ou não existe', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/register')
           .send({ email: 'zebirita@email.com', password: '123456', })
           expect(httpResponse.status).to.equal(400);
           expect(httpResponse.body).to.be.deep.equal({ message: 'The name must be 12 characters long' });  
      })

      it('quando a senha está menor', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/register')
           .send({ name: 'Cliente Teste', email: 'cliente@teste.com', password: '123', })
           expect(httpResponse.status).to.equal(400);
           expect(httpResponse.body).to.be.deep.equal({ message: 'The password must be 6 characters long' });  
      })

      it('quando o email está vazio', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/register')
           .send({ name: 'Cliente Teste', password: '123456', })
           expect(httpResponse.status).to.equal(400);
           expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email' });  
      })

      it('register válido', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/register')
           .send({ name: 'Cliente Teste', email: 'cliente@teste.com', password: '123456', })
           expect(httpResponse.status).to.equal(200);
           expect(httpResponse.body).to.have.property('token');  
      })
})