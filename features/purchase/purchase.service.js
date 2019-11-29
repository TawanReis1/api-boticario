const { Purchase } = require('./purchase.model');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const request = require('request');

class Service {
    getById(id) {
        return Purchase.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await Purchase.countDocuments(query);
        const data = await Purchase.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean();

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    async getCashbackValueByDealerDocument(cpf) {
        const options = { 
            method: 'GET', 
            url: `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`, 
            success: [200], 
            body: {}, 
            timeout: 240000, 
            headers: {}, 
            json: true 
        }

        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
              if (err || !response) return reject(err);
              const success = options.success.find(s => s === response.statusCode);
              if (!success) return reject(body);
              return resolve(body);
            });
          });
    }

    create(purchase) {
        return Purchase.create(purchase);
    }

    deleteOne(id) {
        return Purchase.delete({ _id: id });
    }

    updateOne(id, properties) {
        return Purchase.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
