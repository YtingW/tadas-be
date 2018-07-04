const db = require('../utils/mongo.util')

const UserSchema = db.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
})
const User = db.model('Users', UserSchema)

const save = (data) => {
    let user=new User(data);
    return user.save()
        .then((result)=>{
            return result;})
        .catch((err) => {
            return false;
    })
}
const find = (username) => {
  return User.findOne({username})
  .then(result => result)
}
module.exports = {
  save,
  find
}
