const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema
(
  {
    productId: {type: String, required: true},
    title: {type: String, required: true},
    category: {type: String, required: true},
    brand: {type: String, required: true},
    net: {type: Number, required: true},
    sizeSelected: {type: String},
    colorSelected: {type: String},
    qty: {type: Number, required: true},
    amount: {type: Number, required: true},
    vendorId: {type: String, required: true},
    status: {type: String, required: true}
  }
);

const cartSchema = new mongoose.Schema
(
	{
		userId: {type: String, required: true},
		username: {type: String, required: true},
		orderNum: {type: String, required: true},
		orderDate: {type: Date, required: true},
		items: [orderSchema],
		payment: {type: Object}   
	}, 
	{timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema);