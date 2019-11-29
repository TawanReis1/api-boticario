const { onError, onSuccess, onCreated, onBadRequest } = require('../../shared/handlers/');
const service = require('./dealer.service');

class Controller {

    async list(ctx) {
        try {
            let res = await service.find(ctx.query);
            res.data.forEach(r => {
                r.password = null
            });

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            throw onError('Error trying to list dealers', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            let res = await service.getById(ctx.params.id);
            res.password = null;
            return onSuccess({}, res, ctx);
        } catch (e) {
            throw onError('Error trying to get dealer by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.email) return onBadRequest('Email" cannot be null or empty', ctx);
            if (!ctx.request.body.password) return onBadRequest('Password cannot be null or empty', ctx);
            if (!ctx.request.body.document) return onBadRequest('CPF cannot be null or empty', ctx);

            const response = await service.create(ctx.request.body);
            return {ctx, response};
        } catch (e) {
            throw e
        }
    }
}

module.exports = new Controller();