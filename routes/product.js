const mongoose = require('mongoose')
const { array } = require('../confii/multer')
var productSchema = mongoose.Schema({
  name: String,
  // price: String,
  price:{
    type:Number,
    default:"",
  },
  address:String,
  sellerid:String,
  desc:String,
  pic:{
    type:Array,
    default:[],
  },
  productname:{
    type:Array,
    ref:"products",
  },
  discount:{
    type:Number,
    default:"",
  },
  wishlist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
  }
})

module.exports = mongoose.model('product', productSchema)
