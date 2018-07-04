const userModel=require('../models/user.model');
const tools=require('../utils/tools.util');
const save=async (req,res,next)=>{
    res.setHeader('content-Type','application/json;charset=utf8');
    let username=req.body.username;
    let password=req.body.password;
    let isSign=await userModel.find(username);
    if(isSign){
        res.send({ret:false,data:'用户名已存在'})
    }
    password=await tools.crypt(password);
    let result=await userModel.save({username,password});
    console.log(result);
    if(result){
        res.send({ret:true,data:'注册成功'});
    }else{
        res.send({ret:false,data:'注册失败'});
    }
    
}
const find=async (req,res,next)=>{
    res.setHeader('content-Type','application/json;charset=utf8');
    let username=req.body.username;
    let password=req.body.password;
    let result=await userModel.find(username);
    if(!result){
        res.send({ret:false,isSign:false,data:null});
    }else{
        let compareRes=await tools.compare({
            hash_password:result.password,
            password
        })
        if(compareRes){
            // let token=
            res.send({ret:true,isSign:true,data:result.username});
        }else{
            res.send({ret:false,isSign:false,data:null});
        } 
    }
}
module.exports={
    save,
    find
}