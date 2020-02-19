const faker = require('faker');
const { factory } = require('factory-girl');
const { User, News } = require('../src/app/models');

factory.define('User', User, {
    name:  faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
});

factory.define('News', News, {
  title:  faker.lorem.sentence(),
  content: faker.lorem.text(),
  image: faker.image.imageUrl()
});

module.exports = factory;