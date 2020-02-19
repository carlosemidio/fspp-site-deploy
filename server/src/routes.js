const express = require("express");

const cors = require('cors');

const routes = express.Router();

routes.use(cors());

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const NewsController = require('./app/controllers/NewsController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.view);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.view);
routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.destroy);


routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;