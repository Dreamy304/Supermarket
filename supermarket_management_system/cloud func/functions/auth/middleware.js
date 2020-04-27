const jwt = require('express-jwt');
const jwtToken=require('jsonwebtoken');
const {jwtKey}=require('../config/appconfig');

const loggingMiddleware = (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token=req.headers.authorization.split(' ')[1];
        jwtToken.verify(token,jwtKey.secret,(err,payload)=>{
            if(err){
                console.error(err)
                res.status(401).send("Session expired");
                return
            }
           req.payload=payload;
           console.debug(payload)
           next() 
        });
    }
    else{
        res.status(401).send("Illegal access");
        return
    } 
  }

  module.exports=loggingMiddleware;
