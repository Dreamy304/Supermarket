const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
 } = graphql;

const AdminType = new GraphQLObjectType({
    name: 'admin',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName:{
            type:GraphQLString
        },
        email:{
            type:GraphQLString
        },
        contactNo:{
            type:GraphQLString
        },
        lastModifiedDate:{
            type:GraphQLString
        },
        token:{
            type:GraphQLString
        }
    })
});

module.exports = {
    AdminType
}
