const Router = require('koa-router');
const controller = require('./dealer.controller');
const guard = require('../../shared/middlewares/cashback-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/dealer`);

routes.get('/:id', guard.Authorize, controller.getById);
routes.post('/', guard.Authorize, controller.create);

module.exports = routes;
