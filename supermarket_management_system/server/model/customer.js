const mongo = require('mongoose');
const Schema = mongo.Schema;

const customerSchema = new Schema({
    firstName: { type: String },
    lastName:{type:String},
    contactNo:{type:String},
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean},
    image:{type:String},
    isActive:{type:Boolean},
    clientId:{type:mongo.Types.ObjectId},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('customer', customerSchema);
