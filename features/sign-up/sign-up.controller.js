const DealerController = require('../dealer/dealer.controller');
const { onError, onSuccess } = require('../../shared/handlers/');

class Controller {
    async signUp(ctx) {
        try {
            let createdDealer = await DealerController.create(ctx);
            return onSuccess({}, createdDealer.response, createdDealer.ctx);
        } catch (err) {
            onError('Error trying to sign-up', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();