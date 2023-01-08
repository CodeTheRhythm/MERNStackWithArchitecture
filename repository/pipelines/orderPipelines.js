class OrderPipelines {
	static allRecordsPipeline({vendor}) {
		let conditions = {};

		if (vendor) {
			conditions = {...conditions, "vendorId": vendor};
		}

		conditions = {...conditions, "status": {$eq : "pending"}};

		const pipeline = [  
			{
				$unwind: "$items"
			}, 
			{
				$addFields: {
					"items.cartId": "$_id",
					"items.orderNum": "$orderNum",
					"items.orderDate": "$orderDate",
					"items.username": "$username"
				}
			}, 
			{
				$replaceRoot: {
					newRoot: "$items"
				}
			},
			{$match : conditions}
		];

		return pipeline;
	}
}

module.exports = OrderPipelines;