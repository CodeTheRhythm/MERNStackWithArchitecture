const ControllerBase = require('./controllerBase');
const OrderPipelines = require('../repository/pipelines/orderPipelines');

class OrderController extends ControllerBase {
  constructor() {
    super("carts");
  }

	async updateStatus(req, res) {
		try {
			const data = req.body;
			const result = await this.repo.findById(data.cartId);
			const index = result.items.findIndex(item => item.productId === data.productId);
			result.items[index].status = data.status;
			await this.repo.update(result);
			return {status: 200};
		}
		catch (err) {
			console.log("OrderController.updateStatus[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecords(req, res) {
		try {
			const params = OrderPipelines.allRecordsPipeline({vendor: req.query.vendor});
			return await super.getRecords(req, res, params);
		}
		catch (err) {
			console.log("OrderController.getRecords[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}
}

module.exports = OrderController;