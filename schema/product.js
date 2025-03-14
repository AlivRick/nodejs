let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    min: 0,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  description:{
    type:String,
    default:""
  },
  imgURL:{
    type:String,
    default:""
  },
  category:{
    type:String,
    required:true,
    default:""
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

module.exports = mongoose.model('Product', productSchema); // Export model