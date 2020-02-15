const express = require("express");

const routes = express.Router();

const authMiddleware = require('./app/middleware/auth')

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;