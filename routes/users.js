const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');
const { array } = require('../confii/multer');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/amazon")
.then(function(){
  console.log("connected to server")
})

var userSchema=mongoose.Schema({
  // username:String,
  name:String,
  email:String,
  contact:Number,
  password:String,
  age:Number,
  birth:String,
  // seller:Boolean,
  gstin:Number,
  dpimage:{
    type:String,
    default:'default.png'
  },
  pic:String,
  isSeller: {
    type: Boolean,
    default:true
  },
  products:{
    type: Array,
    ref: "product"
  },
  verify:{
    type:String,
    default:'false'
  },
  address: String,
  email: String,
  proffession:String,
})

userSchema.plugin(passportLocalMongoose,{usernameField:'email'})

module.exports = mongoose.model("user",userSchema);
