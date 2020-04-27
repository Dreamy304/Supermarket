const graphql = require('graphql');
const { CartType } = require('../business/cart');
const Cart = require('../model/cart');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cart: {
            type: CartType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                return Cart.findById(args.id);
            }
        },
        carts: {
            type: new GraphQLList(CartType),
            args: {
                customerId: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.customerId)
                return Cart.find({customerId:args.customerId});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCart: {
            type: GraphQLBoolean,
            args: {
                productId:{type:GraphQLID},
                customerId:{type:GraphQLID},
                quantity:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
               return new Cart(args)
                .save()
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        updateCart:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                quantity:{type:GraphQLString}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return Cart.where({_id:args.id}).update(args)
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        deleteCart:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Cart.deleteOne({
                    _id:args.id
                }).then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
