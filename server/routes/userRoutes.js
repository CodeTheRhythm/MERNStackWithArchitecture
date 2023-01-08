const router = require('express').Router();
const {authorize, respond} = require('./common/utilities');
const {authenticateSuper} = require('./common/middlewares');
const UserController = require('../controllers/userController');
const userController = new UserController();

router.post("/signin", async (req, res) => {
	const returned = await authorize(req, res, (isAdmin) => {
		return (isAdmin === false);
	});

	if (returned.status === 200) {
		res.header("login-token", returned.token);
		res.json(returned.user);
		}
	else {
		respond(res, returned);  
	}
});

router.post("/login", async (req, res) => {
	const returned = await authorize(req, res, (isAdmin) => {
		return (isAdmin === true);
	});

	if (returned.status === 200) {
		res.header("login-token", returned.token);
		res.json(returned.user);
	}
	else {
		respond(res, returned);  
	}
});

router.post("/signup", async (req, res) => {
	req.type = "signup";
	const returned = await userController.addRecord(req, res);
	respond(res, returned);
});

router.post("/join", async (req, res) => {
	req.type = "join";
	const returned = await userController.addRecord(req, res);
	respond(res, returned);
});

router.post("/", authenticateSuper, async (req, res) => {
	const returned = await userController.addRecord(req, res);
	respond(res, returned);
});

router.put("/:id", authenticateSuper, async (req, res) => {
	const returned = await userController.updateRecord(req, res);
	respond(res, returned);
});

router.delete("/:id", authenticateSuper, async (req, res) => {
	const returned = await userController.deleteRecord(req, res);
	respond(res, returned);
});

router.get("/:id", authenticateSuper, async (req, res) => {
	const returned = await userController.getRecordById(req, res);
	respond(res, returned);
});

router.get("/", authenticateSuper, async (req, res) => {
	const returned = await userController.getRecords(req, res);
	respond(res, returned);
});

module.exports = router;