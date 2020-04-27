const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
 } = graphql;

const ClientType = new GraphQLObjectType({
    name: 'client',
    fields: () => ({
        id:{
            type:GraphQLID
        },
        name:{
            type:GraphQLString
        },
        address:{
            type:GraphQLString
        },
        contactNo:{
            type:GraphQLString
        },
        email:{
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
ClientType
}