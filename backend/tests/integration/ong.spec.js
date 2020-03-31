const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {

    let dataTest = {};

    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.destroy();
    });

    it('Should be able to created a new ONG',async () => {
        const response = await request(app)
        .post("/ongs")
        .send({
            name: "abcde test",
            email: "abcde@gmail.com",
            password: "12345",
            whatsapp : "5188888888",
            city: "CIDADE",
            uf: "RS"
        });

        expect(response.body).toHaveProperty('name');
    });

    it('Should be able to authenticate a ONG',async () => {
        const response = await request(app)
        .post("/sessions")
        .send({
            email: "abcde@gmail.com",
            password: "12345"
        });
        expect(response.body).toHaveProperty('token');
        dataTest.token = response.body.token;
    });

    it('Should be able to create a new Incident',async () => {
        const response = await request(app)
        .post("/incidents")
        .set('Authorization',`Bearer ${dataTest.token}`)
        .send({
            title: "title 1",
            description: "Description 1",
            value: "123"
        });
        expect(response.body).toHaveProperty('id');
    });


    it('Should be get all incidents by ONG',async () => {
        const response = await request(app)
        .get("/profiles")
        .set('Authorization',`Bearer ${dataTest.token}`)
        .send({});

        expect(response.body).toHaveLength(1);
    });


})