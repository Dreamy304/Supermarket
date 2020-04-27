const mongo = require('mongoose');
const Schema = mongo.Schema;

const storeSchema = new Schema({
    clientId:{type:mongo.Types.ObjectId},
    location:{type:String},
    coordinates:{type:String},
    contactNo:{type:String},
    email:{type:String},
    isActive:{type:Boolean},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('store', storeSchema);
