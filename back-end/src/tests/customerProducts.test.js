const sinon = require("sinon");
const chai = require("chai");
const jwt = require("jsonwebtoken");
const chaiHttp = require('chai-http');

const { expect } = chai;

const app = require('../api/app')
const { Product } = require('../database/models');
const { validToken } = require('./mocks/token')

describe('Testes backend endpoint /Gets', () => {
    describe('GET /products', () => {
        const mockedProducts = [
            {
                id: 1,
                name: 'Skol Lata 250ml',
                price: 2.20,
                url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg'
            },
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

        beforeEach(async () => {
            sinon
            .stub(Product, "findAll")
            .resolves(mockedProducts);
            });

        afterEach(()=>sinon.restore());

        it('Retorna os produtos', async () => {
            sinon.stub(jwt, 'verify').resolves(true);

            const httpResponse = await chai
            .request(app)
            .get('/product')
            .set("Authorization", validToken);

            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(mockedProducts);    
        })
        it('Invalid token', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/product').set("Authorization", 'Invalid token');

            expect(httpResponse.status).to.equal(401);
            expect(httpResponse.body).to.be.deep.equal({ message: "Token not found" });    
        })
        it('Erro de token cliente', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/product')

            expect(httpResponse.status).to.equal(401);
            expect(httpResponse.body).to.be.deep.equal({ message: "Token not found" });    
        })
    })
})