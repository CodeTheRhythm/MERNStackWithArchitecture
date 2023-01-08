class ProductPipelines {
	static allRecordsPipeline({category, type, vendor}) {
		let conditions = {};

		if (category) {
			conditions = {...conditions, category};
		}

		if (type) {
			if (type === "new") conditions = {...conditions, "type.new": true };
			if (type === "bs") conditions = {...conditions, "type.bs": true };
		}

		if (vendor) {
			conditions = {...conditions, vendorId: vendor};
		}

		const pipeline = [  
			{$match : conditions}
		];

		return pipeline;
	}
}

module.exports = ProductPipelines;