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
 
 const PurchaseType= new GraphQLObjectType({
    name:'purchase',
    fields:()=>({
        productId:{
            type:GraphQLID
        },
        quantity:{
            type:GraphQLInt
        },
        pricePerProduct:{
            type:GraphQLFloat
        }
    })
})

const PurchaseInput= new GraphQLInputObjectType({
    name:'purchaseInput',
    fields:()=>({
        productId:{
            type:new GraphQLNonNull(GraphQLID)
        },
        quantity:{
            type:new GraphQLNonNull(GraphQLInt)
        },
        pricePerProduct:{
            type:new GraphQLNonNull(GraphQLFloat)
        }
    })
})

module.exports = {
    PurchaseType,
    PurchaseInput
}