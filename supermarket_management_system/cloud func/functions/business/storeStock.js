const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt
 } = graphql;

const StoreStockType = new GraphQLObjectType({
    name: 'storeStock',
    fields: () => ({
        productId: {
            type: GraphQLID
        },
        storeId: {
            type: GraphQLID
        },
        quantity: {
            type: GraphQLInt
        },
        expiryDate:{
            type: GraphQLString
        },
        createdDate:{
            type:GraphQLString
        },
        lastupdatedDate:{
            type:GraphQLString
        }
    })
});

module.exports = {
    StoreStockType
}