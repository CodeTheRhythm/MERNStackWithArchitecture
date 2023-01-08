class UserPipelines {
	static allRecordsPipeline({limit}) {
		const pipeline = [  
			{$project: {password: 0}},
			{$sort: {_id: -1}}
		];

		limit && pipeline.push({$limit: parseInt(limit)});
		return pipeline;
	}
}

module.exports = UserPipelines;