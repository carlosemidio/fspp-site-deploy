const express = require("express");

const routes = express.Router();

const authMiddleware = require('./app/middleware/auth')

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.view);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;