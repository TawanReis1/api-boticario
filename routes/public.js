const loginRoutes = require('../features/login/login.route');
const signUpRoutes = require('../features/sign-up/sign-up.route');

class Routing {
  resolve(app) {
    app.use(loginRoutes.routes());
    app.use(signUpRoutes.routes());
  }
}

module.exports = new Routing();
