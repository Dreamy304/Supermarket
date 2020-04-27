const graphql = require('graphql');
const { StoreType } = require('../business/store');
const Store = require('../model/store');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        store: {
            type: StoreType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Store.findById(args.id);
            }
        },
        stores: {
            type: new GraphQLList(StoreType),
            args: { 
                clientId: { type: GraphQLID } 
            },
            resolve(parent, args) {
                console.log(args.clientId)
                   return Store.find({clientId:args.clientId});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStore: {
            type: GraphQLBoolean,
            args: {
                clientId:{type:GraphQLID},
                address:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString},
                coordinates:{type:GraphQLString}
            },
            resolve(parent, args) {
                args.isActive=true;
               return new Store(args)
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
        updateStore:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                clientId:{type:GraphQLID},
                address:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString},
                coordinates:{type:GraphQLString},
                isActive:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return Store.where({_id:args.id}).update(args)
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        deleteStore:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Store.deleteOne({
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
