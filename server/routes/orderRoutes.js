const router = require('express').Router();
const {authenticateAdmin} = require('./common/middlewares');
const {respond} = require('./common/utilities');
const OrderController = require('../controllers/orderController');
const orderController = new OrderController();

router.put("/:id", authenticateAdmin, async (req, res) => {
	const returned = await orderController.updateStatus(req, res);

	if (returned.status === 200) {
		res.end();
	}
	else {
		respond(res, returned);
	}
});

router.get("/:id", authenticateAdmin, async (req, res) => {
	const returned = await orderController.getRecordById(req, res);
	respond(res, returned);
});

router.get("/", authenticateAdmin, async (req, res) => {
	const returned = await orderController.getRecords(req, res);
	respond(res, returned);
});

module.exports = router;