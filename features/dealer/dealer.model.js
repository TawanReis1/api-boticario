const CashbackContext = require('../../shared/cashback-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 200 },
  email: { type: String, required: true, unique: true, maxlength: 200 },
  password: { type: String, required: true },
  document: { type: String, required: true, maxlength: 11 },
},
  {
    versionKey: false, 
    timestamps: true
  });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.DealerSchema = schema;
module.exports.Dealer = CashbackContext.conn.model('Dealer', schema);
