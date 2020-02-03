const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });

        console.log(user);
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'ielwjlwiuoiwuoiuio1212121'
            })

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123'
            })

        expect(response.status).toBe(401);
    });

    it('should return JWT token when authenticated', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'ielwjlwiuoiwuoiuio1212121'
            })

        expect(response.body).toHaveProperty('token');
    });
});