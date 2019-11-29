const dealerRoutes = require('../features/dealer/dealer.route');
const purchaseRoutes = require('../features/purchase/purchase.route');

class Routing {
  resolve(app) {
    app.use(dealerRoutes.routes());
    app.use(purchaseRoutes.routes());
  }
}

module.exports = new Routing();
