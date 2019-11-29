const Router = require('koa-router');
const controller = require('./login.controller');
// const guard = require('../../../_shared/middlewares/guard.middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/login`);

routes.post('/', controller.login);


module.exports = routes;
