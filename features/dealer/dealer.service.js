const { Dealer } = require('./dealer.model');
const bcrypt = require('bcrypt');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');

class Service {
    getById(id) {
        return Dealer.findOne({ _id: id });
    }

    findOne(conditons) {
        return Dealer.findOne(conditons);
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await Dealer.countDocuments(query);
        const data = await Dealer.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean();

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(user) {
        user.password = bcrypt.hashSync(user.password, 10);
        return Dealer.create(user);
    }
}

module.exports = new Service();
