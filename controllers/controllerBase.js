const Repository = require('../repository/Repository');

class ControllerBase {
  constructor(collectionName) {
    this.repo = new Repository(collectionName);
  }

	async addRecord(req, res, data, callback) {
		try {
			const result = await this.repo.insert(data || req.body);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 201, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.addRecord[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async updateRecord(req, res, data, callback) {
		try {
			const item = data || req.body;
			item._id || (item._id = req.params.id);
			const result = await this.repo.update(item);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 200, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.updateRecord[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async deleteRecord(req, res, callback) {
		try {
			const result = await this.repo.delete(req.params.id);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 200, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.deleteRecord[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecordById(req, res, callback) {
		try {
			const result = await this.repo.findById(req.params.id);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 200, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.getRecordById[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecord(req, res, conditions, callback) {
		try {
			const result = await this.repo.findOne(conditions);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 200, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.getRecord[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecords(req, res, params, callback) {
		try {
			const result = await this.repo.findAll(params);

			if (!result.err) {
				callback && callback(result, res);
				return {status: 200, result};
			}
			else {
				return {status: 400, err: result.err};
			}
		}
		catch (err) {
			console.log("ControllerBase.getRecords[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}
}

module.exports = ControllerBase;