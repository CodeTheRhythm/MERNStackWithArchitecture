const ControllerBase = require('./controllerBase');
const ProductPipelines = require('../repository/pipelines/productPipelines');

class ProductController extends ControllerBase {
	constructor() {
		super("products");
	}

	async getRecords(req, res) {
		try {
			const params = ProductPipelines.allRecordsPipeline({
				category: req.query.category,
				type: req.query.type,
				vendor: req.query.vendor
			});
			return await super.getRecords(req, res, params);
		}
		catch (err) {
			console.log("ProductController.getRecords[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}
}

module.exports = ProductController;