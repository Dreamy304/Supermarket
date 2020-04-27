const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
 } = graphql;

 const {PurchaseType}=require('./purchase');

const OrderType = new GraphQLObjectType({
    name: 'order',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        orderDate: {
            type: GraphQLString
        },
        totalQuantity:{
            type:GraphQLInt
        },
        totalPrice:{
            type:GraphQLFloat
        },
        customerId:{
            type:GraphQLID
        },
        deliveryAddress:{
            type:GraphQLString
        },
        orderStatus:{
            type:GraphQLString
        },
        products:{
            type:new GraphQLList(PurchaseType)
        },
        expectedDeliveryDate:{
            type:GraphQLString
        },
        actualDeliveryDate:{
            type:GraphQLString
        },
        data:{
            type:GraphQLString
        }
    })
});



module.exports = {
    OrderType,
}