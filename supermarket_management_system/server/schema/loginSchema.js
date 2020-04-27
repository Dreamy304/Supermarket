const graphql = require('graphql')
const Customer = require('../model/customer')
const jwtToken = require('jsonwebtoken')
const {jwtKey}=require('../config/appconfig')
const bcrypt=require('bcrypt')

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
            resolve(parent, args,context) {
                return Customer.find({ email: args.email,isActive:1})
                    .then(customer => {
                        if(customer.length>0){
                        if (bcrypt.compareSync(args.password, customer[0].password)) {
                            return Promise.resolve(customer[0])
                         }
                         else {
                            // return Promise.reject("Invalid login")
                            context.res.status(500).send("Invalid login")
                            return
                         }
                       }
                    })
                    .then((customer)=>
                        jwtToken.sign({
                        customerId: customer._id
                    }, jwtKey.secret,{ expiresIn: '1d' }))
                    .catch(e=>{throw(e)})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
