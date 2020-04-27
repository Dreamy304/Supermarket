const graphql = require('graphql');
const { ClientType } = require('../business/client');
const Client = require('../model/client');

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
        client: {
            type: ClientType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Client.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                   return Client.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: GraphQLBoolean,
            args: {
                name:{type:GraphQLString},
                address:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString}
            },
            resolve(parent, args) {
                args.isActive=true;
               return new Client(args)
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
        updateClient:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString},
                address:{type:GraphQLString},
                contactNo:{type:GraphQLString},
                email:{type:GraphQLString},
                isActive:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return Client.where({_id:args.id}).update(args)
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        deleteClient:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Client.deleteOne({
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
