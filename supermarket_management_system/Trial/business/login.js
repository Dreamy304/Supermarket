const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
 } = graphql;

const LoginType = new GraphQLObjectType({
    name: 'login',
    fields: () => ({
        email:{
            type:GraphQLString
        },
        password:{
            type:GraphQLString
        }
    })
});

module.exports = {
    LoginType
}