const jwt = require('../helpers/jwtValidator');

class CashbackMiddleware {
    static async Authorize(ctx, next) {
        if (!ctx.request.headers['x-access-token']) {
            ctx.body = { message: 'Access Token not Provided' };
            ctx.status = 401;
            return;
        }

        const token = ctx.request.headers['x-access-token'];
        let validated = jwt.validate(token, process.env.JWT_SECRET, 'HS256');

        if (!validated) {
            ctx.body = { message: 'Access token was expired' };
            ctx.status = 401;
            return;
        }
        await next();
    }

}

module.exports = CashbackMiddleware;