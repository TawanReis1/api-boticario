const Router = require('koa-router');
const controller = require('./sign-up.controller');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/sign-up`);

routes.post('/', controller.signUp);


module.exports = routes;
