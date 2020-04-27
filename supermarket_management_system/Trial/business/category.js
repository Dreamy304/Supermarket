const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
 } = graphql;

const CategoryType = new GraphQLObjectType({
    name: 'category',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        categoryName: {
            type: GraphQLString
        },
        isActive:{
            type:GraphQLBoolean
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
    CategoryType
}