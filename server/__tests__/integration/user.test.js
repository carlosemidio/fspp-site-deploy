const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const { User } = require('../../src/app/models');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should list all users', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });

        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should return an user when a valid id is provided', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });

        const response = await request(app)
            .get(`/users/${user.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not return any user when a valid id is not provided', async () => {
        
        const user = await User.create({ 
            name: 'test1', 
            email: 'test1@email.com', 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });

        const response = await request(app)
            .get(`/users/1000000`)
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(401);
    });

    it('should create user with valid credentials', async () => {
        const user = await factory.create('User', { 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response.status).toBe(200);
    });

    it('should not create user with duplicated email', async () => {
        const user = await User.create({ 
            name: 'test1', 
            email: 'test1@email.com', 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response.status).toBe(401);
    });

    it('should update an user when valid credentials is provided', async () => {
        const user = await User.create({ 
            name: 'test1', 
            email: 'test1@email.com', 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .put(`/users/${user.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
                name: 'test1.1 (update)', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response.status).toBe(200);
    });

    it('should not update an user when invalid id is provided', async () => {
        const user = await User.create({ 
            name: 'test1', 
            email: 'test1@email.com', 
            password: 'ielwjlwiuoiwuoiuio1212121' 
        });
        
        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
                name: 'test1', 
                email: 'test1@email.com', 
                password: 'ielwjlwiuoiwuoiuio1212121'
            });

        expect(response.status).toBe(401);
    });
});