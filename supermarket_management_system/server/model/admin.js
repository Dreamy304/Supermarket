const mongo = require('mongoose');
const Schema = mongo.Schema;

const adminSchema = new Schema({
    firstName: { type: String },
    lastName:{type:String},
    email:{type:String},
    contactNo:{type:String},
    password:{type:String},
    lastModifiedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('admin', adminSchema);
