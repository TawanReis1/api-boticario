const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const mongoConfig = {
    useNewUrlParser: true,
    autoReconnect: true
}

class CashbackContext {

    static get conn() {
        if (!CashbackContext.connection) {
            CashbackContext.connect()         
        }
        return CashbackContext.connection;
    }

    static connect() {
        const cs = process.env.MONGO_CASHBACK;
        CashbackContext.connection = Mongoose.createConnection(cs, mongoConfig);
    }
}

module.exports = CashbackContext;
