const proModel = require('../models/product.model')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const save = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  // req.body.createTime = moment().format('YYYY-MM-DD h:mm')
  req.body.productImg = req.filename;
  const result = await proModel.save(req.body);
  if (result) {
    res.render('product', {ret: true, data: JSON.stringify({msg: 'succ'})})
  } else {
    res.render('product', {ret: false, data: JSON.stringify({msg: 'fail'})})
  }
}

const find = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  let start=Number(req.query.start);
  let count=Number(req.query.count);
  let list = await proModel.find(start,count);
  let result=await proModel.findAll();
  let length=Math.ceil(result.length/count);
  res.send({data:list,length:length});
}
const findById=async(req,res,next)=>{
  res.setHeader('content-Type','application/json;charset=utf-8');
  const id=req.body.id;
  const result=await proModel.findById(id);
  res.render('product',{ret:true,data:JSON.stringify(result)});
}
const update=async(req,res,next)=>{
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  req.body.productImg = req.filename || req.body.filename
  let id = req.body.id;
  const result = await proModel.update(id,{...req.body, id: null, filename: null});
  if (result) {
    res.render('product', {ret: true, data: JSON.stringify({msg: 'succ'})})
  } else {
    res.render('product', {ret: false, data: JSON.stringify({msg: 'fail'})})
  }
}
const search=async(req,res,next)=>{
  res.setHeader('content-Type','application/json;charset=utf8');
  const word=req.body.words;
  let start=Number(req.query.start);
  let count=Number(req.query.count);
  let list=await proModel.findByKeyWords(word,start,count);
  let result=await proModel.findAllByKeyWords(word);
  let length=Math.ceil(result.length/count);
  res.send({ret: true, keywords:word, data: list,length:length})
}
const remove = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  const {id, filename} = req.body
  fs.unlink(path.resolve(__dirname, '../public/uploads/', filename), async (err) => {
    if (err) {
      res.send({ret: false, data: {msg: '删除失败!'}})
    }
    const result = await proModel.remove(id)
    res.send({ret: true, data: result})
  })
}

module.exports = {
  save,
  find,
  findById,
  update,
  search,
  remove
}
