const mongo = require('mongoose');
const Schema = mongo.Schema;

const storeStockSchema = new Schema({
    productId: { type: mongo.Types.ObjectId },
    storeId:{type:mongo.Types.ObjectId},
    quantity:{type:Number},
    expiryDate:{type:Date},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('storeStock', storeStockSchema);
