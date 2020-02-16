const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should list all users', async () => {
        const response = await request(app)
            .get('/users');

        expect(response.status).toBe(200);
    });

    it('should return an user when a valid id is provided', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        const response2 = await request(app)
            .get(`/users/${response.body.id}`);

        expect(response2.status).toBe(200);
    });

    it('should not return an user when a valid id is not provided', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        const response2 = await request(app)
            .get(`/users/1000000`);

        expect(response2.status).toBe(401);
    });

    it('should create user with valid credentials', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response.status).toBe(200);
    });

    it('should not create user with duplicated email', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });
        
        const response2 = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response2.status).toBe(401);
    });

    it('should update an user when valid credentials is provided', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });
        
        const response2 = await request(app)
            .put(`/users/${response.body.id}`)
            .send({
                name: 'test1.1 (update)', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response2.status).toBe(200);
    });

    it('should not update an user when invalid id is provided', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });
        
        const response2 = await request(app)
            .put(`/users/100000`)
            .send({
                name: 'test1.1 (update)', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response2.status).toBe(401);
    });
});