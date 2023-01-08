const router = require('express').Router();
const Cart = require('../models/cartModel');

router.post("/", async (req, res) => {
	try {
		const cart = new Cart(req.body);
		const added = await cart.save();
		res.status(201).json(added);
	}
	catch (err) {
		console.log("cart-post[error]:", err.message);
		res.status(500).json(err.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updated = await Cart.findByIdAndUpdate(
			req.params.id, 
			{$set: req.body}, 
			{new: true}
		);
		res.json(updated);
	}
	catch (err) {
		console.log("cart-put[error]:", err.message);
		res.status(500).json(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.end();
	}
	catch (err) {
		console.log("cart-delete[error]:", err.message);
		res.status(500).json(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const item = await Cart.findById(req.params.id);
		res.json(item);
	}
	catch (err) {
		console.log("cart-findById[error]:", err.message);
		res.status(500).json(err.message);
	}
});

router.get("/", async (req, res) => {
	try {
    // {orderNum: "ODR-1672289350382-abc"}
    // {"items.net": 400}
    // {"items.net": {$lte: 50}}
    // {"items.net": {$gt: 50}}
    // {"items": {$elemMatch: {productId: "63ad07d4d7a09541e1a78bd0", net: 300}}}
		const items = await Cart.find({"items": {$elemMatch: {productId: "63ad07d4d7a09541e1a78bd0", net: 300}}}).sort({createdAt: 1});
		res.json(items);
	}
	catch (err) {
		console.log("cart-find[error]:", err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;