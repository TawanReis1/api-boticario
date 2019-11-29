const Router = require('koa-router');
const controller = require('./purchase.controller');
const guard = require('../../shared/middlewares/cashback-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/purchase`);

routes.get('/', guard.Authorize, controller.list);
routes.get('/:id', guard.Authorize, controller.getById);
routes.get('/external/cashback/:cpf', guard.Authorize, controller.getCashbackValueByDealerDocument);
routes.post('/', guard.Authorize, controller.create);
routes.put('/:id', guard.Authorize, controller.update);
routes.delete('/:id', guard.Authorize, controller.delete);

module.exports = routes;
