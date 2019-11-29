const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers/');
const purchaseService = require('./purchase.service');
const moment = require('moment');

class Controller {

    async list(ctx) {
        try {
            let res = await purchaseService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            return onError('Error trying to list purchases', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            const res = await purchaseService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get purchase by id', e.toString(), ctx);
        }
    }

    async getCashbackValueByDealerDocument(ctx) {
        try {
            const res = await purchaseService.getCashbackValueByDealerDocument(ctx.params.cpf);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get purchase by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.code) return onBadRequest('Code cannot be null or empty', ctx);
            if (!ctx.request.body.purchaseDate) return onBadRequest('Purchase date cannot be null or empty', ctx);
            if (!ctx.request.body.price) return onBadRequest('Price cannot be null or empty', ctx);
            if (!ctx.request.body.dealer) return onBadRequest('Dealer cannot be null or empty', ctx);

            if (ctx.request.body.dealer === '15350946056') {
                ctx.request.body.status = "APPROVED";
            } else {
                ctx.request.body.status = "ANALYZING";
            }

            if (ctx.request.body.price <= 1000) {
                ctx.request.body.cashbackPercentage = 10;
            } else if (ctx.request.body.price > 1000 && ctx.request.body.price <= 1500) {
                ctx.request.body.cashbackPercentage = 15;
            } else {
                ctx.request.body.cashbackPercentage = 20;
            }

            ctx.request.body.cashbackValue = (ctx.request.body.price * (ctx.request.body.cashbackPercentage / 100)).toFixed(2);

            const response = await purchaseService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create purchase', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.code) return onBadRequest('Code cannot be null or empty', ctx);
            if (!ctx.request.body.price) return onBadRequest('Price cannot be null or empty', ctx);
            if (!ctx.request.body.dealer) return onBadRequest('Dealer cannot be null or empty', ctx);

            const purchase = await purchaseService.getById(ctx.params.id);
            if (purchase.status !== 'ANALYZING') return onBadRequest('Cannot update a purchase when status is different than "Em validação"', ctx);

            if (ctx.request.body.price <= 1000) {
                ctx.request.body.cashbackPercentage = 10;
            } else if (ctx.request.body.price > 1000 && ctx.request.body.price <= 1500) {
                ctx.request.body.cashbackPercentage = 15;
            } else {
                ctx.request.body.cashbackPercentage = 20;
            }

            ctx.request.body.cashbackValue = (ctx.request.body.price * (ctx.request.body.cashbackPercentage / 100)).toFixed(2);


            const response = await purchaseService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update purchase', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            const purchase = await purchaseService.getById(ctx.params.id);
            if (purchase.status !== 'ANALYZING') return onBadRequest('Cannot delete a purchase when status is different than "Em andamento"', ctx);

            await purchaseService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete purchase', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();