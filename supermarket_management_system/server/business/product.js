const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean
 } = graphql;

const ProductType = new GraphQLObjectType({
    name: 'product',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        productName: {
            type: GraphQLString
        },
        categoryId:{
            type: GraphQLID
        },
        brand:{
            type:GraphQLString
        },
        price:{
            type:GraphQLFloat
        },
        isActive:{
            type:GraphQLBoolean
        },
        image:{
            type:GraphQLString
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
    ProductType
}