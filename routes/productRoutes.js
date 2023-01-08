const router = require('express').Router();
const {authenticateAdmin} = require('./common/middlewares');
const {respond} = require('./common/utilities');
const ProductController = require('../controllers/productController');
const productController = new ProductController();

router.post("/", authenticateAdmin, async (req, res) => {
	const returned = await productController.addRecord(req, res);
	respond(res, returned);
});

router.put("/:id", authenticateAdmin, async (req, res) => {
	const returned = await productController.updateRecord(req, res);
	respond(res, returned);
});

router.delete("/:id", authenticateAdmin, async (req, res) => {
	const returned = await productController.deleteRecord(req, res);
	respond(res, returned);
});

router.get("/:id", async (req, res) => {
	const returned = await productController.getRecordById(req, res);
	respond(res, returned);
});

router.get("/", async (req, res) => {
	const returned = await productController.getRecords(req, res);
	respond(res, returned);
});

module.exports = router;