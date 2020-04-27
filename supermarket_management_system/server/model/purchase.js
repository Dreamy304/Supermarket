const mongo = require('mongoose');
const Schema = mongo.Schema;

const purchaseSchema=new Schema({
    productId:{type:mongo.Types.ObjectId},
    quantity:{type:Number},
    pricePerProduct:{type:Number}
})

module.exports.purchaseSchema = purchaseSchema;