const CashbackContext = require('../../shared/cashback-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, maxlength: 20 },
    price: { type: Number, required: true, maxlength: 20 },
    purchaseDate: { type: String, required: true },
    dealer: { type: String, required: true, maxlength: 11 },
    status: { type: String, default: 'ANALYZING', enum: ["ANALYZING", "APPROVED", "REPROVED"] },
    cashbackPercentage: {type: Number, required: true, maxlength: 10},
    cashbackValue: {type: Number, required: true, maxlength: 20}
},
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.PurchaseSchema = schema;
module.exports.Purchase = CashbackContext.conn.model('Purchase', schema);
