const mongo = require('mongoose');
const Schema = mongo.Schema;

const categorySchema = new Schema({
    categoryName: { type: String },
    isActive:{type:Boolean},
    createdDate:{type:Date,default:Date.now()},
    lastupdatedDate: { type: Date,default:Date.now() }
});

module.exports = mongo.model('category', categorySchema);
