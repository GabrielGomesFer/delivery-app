import * as sinon from 'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { describe } from 'pm2';

chai.use(chaiHttp);

const { expect } = chai;
//        email: 'zebirita@email.com',
//        password: '1c37466c159755ce1fa181bd247cb925' certa $#zebirita#$,
// 'Cliente Zé Birita', 'zebirita@email.com', customer

describe('Rota /Login', () => {

    beforeEach(async () => {
        sinon
          .stub(User, "findOne")
          .resolves({
            name: 'Cliente Zé Birita',
            role: 'customer',
            email: 'zebirita@email.com',
            password: '1c37466c159755ce1fa181bd247cb925'
          });
      });

    it('quando o email está errrado', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/login')
           .send({ email: 'zebirita@ea.com', password: '$#zebirita#$', })
           expect(httpResponse.status).to.equal(404);
           expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });  
      })

      it('quando a senha está errrada', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/login')
           .send({ email: 'zebirita@email.com', password: '$#zebir#$', })
           expect(httpResponse.status).to.equal(404);
           expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });  
      })

      it('quando o email não está no formato correto', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/login')
           .send({ email: 'zebirita@email', password: '$#zebirita#$', })
           expect(httpResponse.status).to.equal(400);
           expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email' });  
      })

      it('quando a senha não está no formato correto', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/login')
           .send({ email: 'zebirita@email.com', password: '12345', })
           expect(httpResponse.status).to.equal(400);
           expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid password' });  
      })

      it('Login válido', async () => {
        const httpResponse = await chai
           .request(app)
           .post('/login')
           .send({ email: 'zebirita@email.com', password: '$#zebirita#$', })
           expect(httpResponse.status).to.equal(200);
           expect(httpResponse.body).to.have.property('token');  
      })
})