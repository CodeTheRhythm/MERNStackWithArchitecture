const router = require('express').Router();
const path = require('path');

router.post('/', function(req, res) {
	try {
		const postfix = req.query.postfix;
		const folder = req.query.folder;

		if (req.files === null) {
			return res.status(400).json({msg: "No file uploaded"});
		}

		const file = req.files.file;
		const filename = file.name.replace(".jpg", `_${postfix}.jpg`);
		const target = path.join(__dirname, "..", "images", folder, filename);

		file.mv(target, err => {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: err});
			}

			res.json({
				url: `${process.env.IMAGE_URL}${folder}/${filename}`,
				filename
			});
		});
	}
	catch (err) {
		console.log(err);
		return res.status(500).json({msg: err.message});
	}
});

module.exports = router;