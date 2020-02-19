const request  = require('supertest');
const factory  = require('../factories');
const app      = require('../../src/app');
const truncate = require('../utils/truncate');
const { User } = require('../../src/app/models');

describe('User', () => {
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
    const user = await factory.create('User', { 
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
      name: 'test2', 
      email: 'test2@email.com', 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
          name: 'test2.1', 
          email: 'test2@email.com', 
          password: 'ielwjlwiuoiwuoiuio1212121'
      });

    expect(response.status).toBe(401);
  });

  it('should update an user when a valid id is provided', async () => {
    const user = await User.create({ 
      name: 'test3', 
      email: 'test3@email.com', 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
          name: 'test3.1 (update)', 
          email: 'test300@email.com', 
          password: 'ielwjlwiuoiwuoiuio1212121'
      });

    expect(response.status).toBe(200);
  });

  it('should not update an user when invalid id is provided', async () => {
    const user = await User.create({ 
      name: 'test4', 
      email: 'test4@email.com', 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
      
    const response = await request(app)
      .put(`/users/99999999`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
          name: 'test4.1', 
          email: 'test4@email.com', 
          password: 'ielwjlwiuoiwuoiuio1212121'
      });

    expect(response.status).toBe(401);
  });

  it('should delete an user when valid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should not update an user when invalid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .delete(`/users/99999999`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.status).toBe(401);
  });
});