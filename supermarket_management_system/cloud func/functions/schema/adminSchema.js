const graphql = require('graphql');
const { AdminType } = require('../business/admin');
const Admin = require('../model/admin');
const jwtToken = require('jsonwebtoken')
const { jwtKey } = require('../config/appconfig')
const bcrypt = require('bcrypt')
const { helperFunctions } = require('../helper/helper');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        adminLogin: {
            type: AdminType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args,context) {
                return Admin.find({})
                    .then(admin => {
                        if (admin.length > 0) {
                            if (bcrypt.compareSync(args.password, admin[0].password)) {
                                return Promise.resolve(admin[0])
                            }
                            // else {
                               // context.res.status(500).send("Invalid login")
                                // return Promise.reject(new Error("Invalid login"))
                                // return Promise.reject("Invalid login")
                            // }
                        }
                        return Promise.reject(new Error("Invalid login"))
                    })
                    .catch(e => { throw (e) })
                    .then((admin) => {
                        admin.token = jwtToken.sign({
                            adminId: admin._id
                        }, jwtKey.secret, { expiresIn: '1d' })
                        return admin;
                    })
                    .catch(e => { throw (e) })
            }
        },
        forgotPassword: {
            type: GraphQLBoolean,
            args: {
                email: { type: GraphQLString }
            },
            resolve(parent, args,context) {
                return Admin.find({ 'email': args.email })
                    .then(admin => {
                        if (admin.length > 0) {
                            let newPassword = helperFunctions.generatePassword();
                            let newhashedPassword=bcrypt.hashSync(newPassword,bcrypt.genSaltSync(10));
                            Admin.where({'email':args.email}).update({password:newhashedPassword}).then(()=>{
                                helperFunctions.sendForgotPasswordMail(args.email,newPassword);
                                return Promise.resolve(true)
                            }).catch(e => { throw (e) })
                            return Promise.resolve(true)
                        }
                        else {
                            context.res.status(500).send("We don't have this email registered with us.")
                            return
                            // return Promise.reject("We don't have this email registered with us.")
                        }
                    })
                    .then((admin) => {
                        admin.token = jwtToken.sign({
                            adminId: admin._id
                        }, jwtKey.secret, { expiresIn: '1d' })
                        return admin;
                    })
                    .catch(e => { throw (e) })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
