const mongo = require('mongoose');
const {purchaseSchema}=require('./purchase')
const Schema = mongo.Schema;

const orderSchema = new Schema({
    orderDate: { type: Date,default:Date.now() },
    totalQuantity:{type:Number},
    totalPrice:{type:Number},
    customerId:{type:mongo.Types.ObjectId},
    deliveryAddress:{type:String},
    orderStatus:{type:String},
    expectedDeliveryDate:{type:Date},
    actualDeliveryDate:{type:Date},
    data:{type:String},
    products:[purchaseSchema]
});

module.exports = mongo.model('order', orderSchema);
