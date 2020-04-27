const graphql = require('graphql');
const { StoreStockType } = require('../business/storeStock');
const StoreStock = require('../model/storeStock');

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
        storeStock: {
            type: StoreStockType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return StoreStock.findById(args.id);
            }
        },
        storeStocks: {
            type: new GraphQLList(StoreStockType),
            args:{
                storeId:{type:GraphQLID}
            },
            resolve(parent, args) {
                console.log(args.storeId)
                   return StoreStock.find({storeId:args.storeId});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStoreStock: {
            type: GraphQLBoolean,
            args: {
                productId:{type:GraphQLID},
                storeId:{type:GraphQLID},
                quantity:{type:GraphQLInt},
                expiryDate:{type:GraphQLString}
            },
            resolve(parent, args) {
               return new StoreStock(args)
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
        updateStoreStock:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                quantity:{type:GraphQLInt},
                expiryDate:{type:GraphQLString}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return StoreStock.where({_id:args.id}).update(args)
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        deleteStoreStock:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return StoreStock.deleteOne({
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
