const CryptoJS = require('crypto-js');
const ControllerBase = require('./controllerBase');
const UserPipelines = require('../repository/pipelines/userPipelines');
const {generateToken} = require('../routes/common/utilities');

class UserController extends ControllerBase {
	constructor() {
		super("users");
	}

	async addRecord(req, res) {
		return await this.saveRecord(req, res, "add");
	}

	async updateRecord(req, res) {
		return await this.saveRecord(req, res, "update");
	}

	async saveRecord(req, res, operation) {
		try {
			const data = req.body;

			if (data.password !== data.confirm) {
				return {status: 400, err: "Passwords do not match"};
			}

			data.password = CryptoJS.AES.encrypt(data.password, process.env.SECRET_KEY).toString();
			delete data.confirm;
			if (req.type === "join") {
				data.address = null;
				data.postcode = null;
				data.birthday = null;
				data.gender = null;
			}
			data.userType && (data.isActive = true);

			if (operation === "add") {
				data.isAdmin = (req.type === "join" ? true : false);
				data.isSuper = !req.type && true;

				return await super.addRecord(req, res, data, (result, response) => {
					if (req.type === "signup") {
						const token = generateToken(result);
						response.header("login-token", token);
					}
          delete result.item.password;
				});
			}
			else {
				return await super.updateRecord(req, res, data, (result, response) => {
					delete result.item.password;
				});
			}
		}
		catch (err) {
			console.log("UserController.saveRecord[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecordById(req, res) {
		try {
			return super.getRecordById(req, res, (result, response) => {
				delete result.item.password;
			});
		}
		catch (err) {
			console.log("UserController.getRecordById[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}

	async getRecords(req, res) {
		try {
			const params = UserPipelines.allRecordsPipeline({limit: req.query.limit});
			return super.getRecords(req, res, params);
		}
		catch (err) {
			console.log("UserController.getRecords[error]:", err.message);
			return {status: 500, err: err.message};
		}
	}
}

module.exports = UserController;