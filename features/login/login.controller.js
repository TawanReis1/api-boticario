const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const DealerService = require('../dealer/dealer.service');
const { onError, onSuccess } = require('../../shared/handlers/');

class Controller {
    async login(ctx) {
        try {
            const credentials = ctx.headers.authorization;
            const userAuth = Buffer.from(credentials, 'base64').toString('utf-8').replace('Basic ', '');
            const [email, password] = userAuth.split(':');

            const user = await DealerService.findOne({ email });
            if (!user || user.length == 0) throw "Invalid E-mail"

            const authenticated = bcrypt.compareSync(password, user.password);
            if (!authenticated) throw "Invalid Password";            

            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET, { expiresIn: 86400 });

            const body = {
                type: 'Bearer',
                accessToken: token,
                expiresIn: 86400,
                expiresDate: moment().add(23, 'hours').format('YYYY-MM-DDTHH:mm:ss')
            }

            return onSuccess({},body,ctx);

        } catch (err) {
            onError('Error trying to login', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();