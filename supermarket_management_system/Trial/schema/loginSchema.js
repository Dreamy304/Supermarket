const graphql = require('graphql')
const jwtToken = require('jsonwebtoken')
const { jwtKey } = require('../config/appconfig')
const bcrypt = require('bcrypt')
const data = require('../dataAccess/data')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                console.log('Inside login')
                return data.getCustomerByEmail(args.email)
                    .then(customer => {
                        if (customer != null) {
                            if (bcrypt.compareSync(args.password, customer.password)) {
                                let token = jwtToken.sign({
                                    customerId: customer.id
                                }, jwtKey.secret, { expiresIn: '1d' })
                                
                                return Promise.resolve(token)
                            }
                            
                        }
                            return Promise.reject("Invalid login")
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
