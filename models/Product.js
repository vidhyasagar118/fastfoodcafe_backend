const mongoose = require("mongoose");

const productSchema =
new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  description:String,

  image:String,

  category:String,

  price:Number,

  discount:{
    type:Number,
    default:0
  }
  ,
 reviews: [
  {
    userName: String,
    email: String,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

rating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
reviewedUsers: [
  {
    type: String
  }
]
,
stock: {
  type: Number,
  default: 10,
},
discountStart: Date,
discountEnd: Date,
});

module.exports =
mongoose.model(
  "Product",
  productSchema
);