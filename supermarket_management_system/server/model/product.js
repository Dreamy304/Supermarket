const mongo = require('mongoose');
const Schema = mongo.Schema;

const productSchema = new Schema({
    productName: { type: String },
    categoryId:{type:mongo.Types.ObjectId},
    brand:{type:String},
    price:{type:Number},
    isActive:{type:Boolean},
    image:{type:String},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('product', productSchema);
