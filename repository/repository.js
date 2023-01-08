const {MongoClient, ObjectId} = require('mongodb');

class Repository {
	constructor (_collectionName) {
		this.collectionName = _collectionName;
		this.connection = null;
		this.database = null;
		this.collection = null;
	}

	async connect() {
		try {
			this.connection = await MongoClient.connect(process.env.CONNECTION_URL);
			this.database = this.connection.db(process.env.DATABASE);
			this.collection = this.database.collection(this.collectionName);
		}
		catch (err) {
			console.log("Repository.connect[error]:", err.message);
		}
	}

	async insert(item) {
		let result = {};

		try {
			await this.connect();

			const currentDateTime = new Date();
			item.createdAt = currentDateTime;
			item.updatedAt = currentDateTime;
			item.__v = 0;
			delete item.img_file;

			result = await this.collection.insertOne(item);

			item._id = result.insertedId.toString();
			result.item = item;
			return result;
		}
		catch (err) {
			console.log("Repository.insert[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}

	async update(item) {
		let result = {};

		try {
			await this.connect();

			const id = item._id;
			item.updatedAt = new Date();
			delete item._id;
			delete item.img_file;

			result = await this.collection.updateOne(
				{_id: ObjectId(id)}, 
				{$set: item},
				{"upsert": false}
			);

			result.updatedId = id;
			result.item = item;
			return result;
		}
		catch (err) {
			console.log("Repository.update[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}

	async delete(id) {
		let result = {};

		try {
			await this.connect();
			result = await this.collection.deleteOne({_id: ObjectId(id)});
			result.deletedId = id;
			return result;
		}
		catch (err) {
			console.log("Repository.delete[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}

	async findById(id) {
		let result = {};

		try {
			await this.connect();
			result = await this.collection.findOne({_id: ObjectId(id)});
			return result || {};
		}
		catch (err) {
			console.log("Repository.findById[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}

	async findOne(conditions) {
		let result = {};

		try {
			await this.connect();
			result = await this.collection.findOne(conditions);
			return result || {};
		}
		catch (err) {
			console.log("Repository.findOne[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}

	async findAll(params) {
		let result = {};

		try {
			await this.connect();
			result = await this.collection.aggregate(params || []).toArray();
			return result || {};
		}
		catch (err) {
			console.log("Repository.findAll[error]:", err.message);
			result.err = err.message;
			return result;
		}
		finally {
			this.connection.close();
		}
	}
}

module.exports = Repository;