const mongo = require('mongoose');
const Schema = mongo.Schema;

const cartSchema = new Schema({
    productId: { type: mongo.Types.ObjectId },
    customerId:{type:mongo.Types.ObjectId},
    quantity:{type:Number},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('cart', cartSchema);
