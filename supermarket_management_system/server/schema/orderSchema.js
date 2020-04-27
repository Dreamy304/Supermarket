const graphql = require('graphql');
const { OrderType } = require('../business/order');
const { PurchaseInput } = require('../business/purchase');
const Order = require('../model/order');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLBoolean
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        order: {
            type: OrderType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Order.findById(args.id);
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                   return Order.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOrder: {
            type: GraphQLBoolean,
            args: {
                customerId:{type:GraphQLID},
                deliveryAddress:{type:GraphQLString},
                orderStatus:{type:GraphQLString},
                products:{type:new GraphQLList(PurchaseInput)},
                expectedDeliveryDate:{type:GraphQLString},
                actualDeliveryDate:{type:GraphQLString},
                data:{type:GraphQLString}
            },
            resolve(parent, args) {
                args.totalQuantity=args.products.reduce(calculateQuantity,0);
                args.totalPrice=args.products.reduce(calculatePrice,0);
               return new Order(args)
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
        updateOrder:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                deliveryAddress:{type:GraphQLString},
                orderStatus:{type:GraphQLString},
                expectedDeliveryDate:{type:GraphQLString},
                actualDeliveryDate:{type:GraphQLString},
                data:{type:GraphQLString}
            },
            resolve(parent,args){
                new Promise((resolve, reject) => {
                    if (args.data != null) {
                        Order.findById(args.id).then(order => {
                            order.data.push(args.data);
                            args.data = order.data;
                        })
                    }
                }).then(Order.where({ _id: args.id }).update(args)
                    .then(() => {
                        return true;
                    })
                    .catch((e) => {
                        console.log(e);
                        return false;
                    }))
            }
        },
        deleteOrder:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Order.deleteOne({
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

let calculateQuantity = (total, p) => {
    console.log(p.quantity)
    console.log(total)
    return total + p.quantity;
}

let calculatePrice = (total, p) => {
    return total + (p.quantity * p.pricePerProduct);
}

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
