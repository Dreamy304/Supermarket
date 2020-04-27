const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt
 } = graphql;

const CartType = new GraphQLObjectType({
    name: 'storeStock',
    fields: () => ({
        productId: {
            type: GraphQLID
        },
        customerId: {
            type: GraphQLID
        },
        quantity: {
            type: GraphQLInt
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
    CartType
}