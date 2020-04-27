const mongo = require('mongoose');
const Schema = mongo.Schema;

const clientSchema = new Schema({
    name:{type:String},
    address: { type: String},
    contactNo:{type:String},
    email:{type:String},
    isActive:{type:Boolean},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('client', clientSchema);
