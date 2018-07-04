const db = require('../utils/mongo.util')

const ProductSchema = db.Schema({
  productImg: { type: String, require: true},
  productName: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  description: { type: String, required: true }
  // createTime: { type: String, require: true }
  // createTime: { type: String }
})

// PositionSchema.virtual('createTime').get(function () {
//   return moment().format('YYYY-MM-DD h:mm');
// });

const Product = db.model('Products', ProductSchema)

const save = (data) => {
  let pro = new Product(data)
  return pro.save().then((result) => {
    return result
  }).catch((err) => {
    return false
  })
}

const find = (start,count) => {
  return Product.find({})
  .skip(start)
  .limit(count)
  .sort({_id: -1}).then(result => result)
}
const findAll=()=>{
  return Product.find({})
  .sort({_id:-1})
  .then(result=>result)
}
const findById=(id)=>{
  return Product.findById(id)
  .then(result=>result) 
}
const update=(id,data)=>{
  return Product.findByIdAndUpdate(id, data)
    .then(result => result)
    .catch(err => err.msg)
}
const findByKeyWords=(word,start,count)=>{
  return Product.find({
    productName:new RegExp(word,'gi')
  })
  .skip(start)
  .limit(count)
  .sort({_id: -1})
  .then(result=>result)
}
const findAllByKeyWords=(word)=>{
  return Product.find({
    productName:new RegExp(word,'gi')
  })
  .sort({_id: -1})
  .then(result=>result)
}
const remove = (id) => {
  return Product.findByIdAndRemove(id)
    .then(result => result)
}

module.exports = {
  save,
  find,
  findAll,
  findById,
  update,
  findByKeyWords,
  findAllByKeyWords,
  remove
}
