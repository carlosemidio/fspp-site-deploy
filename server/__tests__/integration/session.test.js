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

  it('should not authenticate with invalid user', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'email123',
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

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .get('/dashboard');
  

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
    
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 3131wwdqdsa`);

    expect(response.status).toBe(401);
  });
});