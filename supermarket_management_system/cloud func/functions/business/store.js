const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
 } = graphql;

const StoreType = new GraphQLObjectType({
    name: 'store',
    fields: () => ({
        clientId:{
            type:GraphQLID
        },
        email:{
            type:GraphQLString
        },
        address:{
            type:GraphQLString
        },
        coordinates:{
            type:GraphQLString
        },
        contactNo:{
            type:GraphQLString
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
StoreType
}