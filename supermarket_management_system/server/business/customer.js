const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
 } = graphql;

const CustomerType = new GraphQLObjectType({
    name: 'customer',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName:{
            type: GraphQLString
        },
        contactNo:{
            type:GraphQLString
        },
        email:{
            type:GraphQLString
        },
        password:{
            type:GraphQLString
        },
        isAdmin:{
            type:GraphQLBoolean
        },
        image:{
            type:GraphQLString
        },
        isActive:{
            type:GraphQLBoolean
        },
        clientId:{
            type:GraphQLID
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
    CustomerType
}