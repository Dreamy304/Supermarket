const graphql = require('graphql');
const { ProductType } = require('../business/product');
const Product = require('../model/product');
const moment=require('moment');
const data=require('../dataAccess/data')

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
        product: {
            type: ProductType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Product.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            args:{
                clientId:{
                    type:GraphQLString
                }
            },
            resolve(parent, args) {
                if (args.clientId!=null) {
                    return data.getProductsByClientId(args.clientId)
                }
                else{
                      return  data.getProducts()
                   }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: GraphQLBoolean,
            args: {
                productName: {type: GraphQLString},
                categoryId:{type:GraphQLString},
                brand:{type:GraphQLString},
                image:{type:GraphQLString},
                price:{type:GraphQLFloat}
            },
            resolve(parent, args) {
                args.isActive=true;
                args.expiryDate=moment.unix(args.expiryDate);
                return new Product(args).save()
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                })
            }
        },
        updateProduct:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                productName: {type: GraphQLString},
                categoryId:{type:GraphQLString},
                brand:{type:GraphQLString},
                price:{type:GraphQLFloat},
                image:{type:GraphQLString},
                isActive:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return Product.where({ _id: args.id })
                    .update(args)
                    .then(() => {
                        return true;
                    })
                    .catch(() => {
                        return false;
                    })
            }
        },
        deleteProduct:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Product.deleteOne({
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
