const request  = require('supertest');
const factory  = require('../factories');
const app      = require('../../src/app');
const truncate = require('../utils/truncate');

describe('News', () => {
  beforeEach(async () => {
      await truncate();
  });

  it('should list all news', async () => {
    const news = await factory.create('News');

    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const response = await request(app)
      .get('/news')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should return a news when a valid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const news = await factory.create('News');

    const response = await request(app)
      .get(`/news/${news.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not return any news when a valid id is not provided', async () => {      
    const news = await factory.create('News');

    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const response = await request(app)
      .get(`/news/1000000`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should create news with valid credentials', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const response = await request(app)
      .post('/news')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'test1', 
        content: 'akljkçsdkfsdljkfglskjdgjdljgdjkfgjlks', 
        image: 'ielwjlwiuoiwuoiuio1212121'
      });

    expect(response.status).toBe(200);
  });

  it('should not create news without title', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });
      
    const response = await request(app)
      .post('/news')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        content: 'jmlksdjjlsjlfksdfl', 
        image: 'ielwjlwiuoiwuoiuio1212121'
      });

    user.destroy();

    expect(response.status).toBe(401);
  });

  it('should update a news when valid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const news = await factory.create('News');
      
    const response = await request(app)
      .put(`/news/${news.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'test1', 
        content: 'jcldsajfjsalfjlsdjlfgjsdgjsjgljsdlkjgljdsl', 
        image: 'ielwjlwiuoiwuoiuio1212121' 
      });
  

    expect(response.status).toBe(200);
  });

  it('should not update a news when invalid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const news = await factory.create('News');
    
    const response = await request(app)
      .put(`/news/99999`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'test1', 
        content: 'jcldsajfjsalfjlsdjlfgjsdgjsjgljsdlkjgljdsl', 
        image: 'ielwjlwiuoiwuoiuio1212121' 
      });

    expect(response.status).toBe(401);
  });

  it('should delete an news when valid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const news = await factory.create('News');
    
    const response = await request(app)
      .delete(`/news/${news.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should not update an news when invalid id is provided', async () => {
    const user = await factory.create('User', { 
      password: 'ielwjlwiuoiwuoiuio1212121' 
    });

    const news = await factory.create('News');
    
    const response = await request(app)
      .delete(`/news/99999999`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.status).toBe(401);
  });
});