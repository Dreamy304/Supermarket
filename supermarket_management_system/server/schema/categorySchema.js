const graphql = require('graphql');
const { CategoryType } = require('../business/category');
const Category = require('../model/category');

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
        category: {
            type: CategoryType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parent, args) {
                console.log(args.id)
                   return Category.findById(args.id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                   return Category.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: GraphQLBoolean,
            args: {
                categoryName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                args.isActive=true;
               return new Category(args)
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
        updateCategory:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID},
                categoryName:{type: GraphQLString},
                isActive:{type:GraphQLBoolean}
            },
            resolve(parent,args){
                args.lastupdatedDate=moment();
                console.log(args)
                return Category.where({_id:args.id}).update(args)
                .then(()=>{
                    return true;
                })
                .catch((e)=>{
                    console.log(e);
                    return false;
                });
            }
        },
        deleteCategory:{
            type:GraphQLBoolean,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return Category.deleteOne({
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
