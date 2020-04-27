const graphql = require('graphql')
const { CustomerType } = require('../business/customer')
const Customer = require('../model/customer')
const moment=require('moment')
const bcrypt=require('bcrypt')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer:{
            type:CustomerType,
            resolve(parent,args,context){
                console.log(context.payload.customerId);
                return Customer.findById(context.payload.customerId)
            }
        },
        customerById: {
            type: CustomerType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Customer.findById(args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                   return Customer.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: GraphQLBoolean,
            args: {
                firstName: {type: GraphQLString},
                lastName:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString},
                isAdmin:{type: GraphQLBoolean},
                image:{type:GraphQLString},
                clientId:{type:GraphQLID}
            },
            resolve(parent, args) {
                args.isActive=true;
                args.password=bcrypt.hashSync(args.password,bcrypt.genSaltSync(10));
                return new Customer(args).save()
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                })
            }
        },
        updateCustomer:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                firstName: {type: GraphQLString},
                lastName:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString},
                password:{type:GraphQLString},
                isAdmin:{type: GraphQLBoolean},
                image:{type:GraphQLString},
                isActive:{type:GraphQLBoolean},
                clientId:{type:GraphQLID}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                if(args.password!=null){
                    args.password=bcrypt.hashSync(args.password,bcrypt.genSaltSync(10));
                }
                return Customer.where({ _id: args.id })
                    .update(args)
                    .then(() => {
                        return true;
                    })
                    .catch((e) => {
                        console.log(e)
                        return false;
                    })
            }
        },
        deleteCustomer:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Customer.deleteOne({
                    _id:args.id
                })
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
