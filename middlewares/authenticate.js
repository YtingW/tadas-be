const fs=require('fs');
const jwt=require('jsonwebtoken');
const path=require('path');
module.exports=(req,res,next)=>{
    res.setHeader('content-Type','application/json;charset=utf8');
    let token=req.header('access-token');
    
}