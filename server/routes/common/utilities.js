const JWT = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const Repository = require('../../repository/Repository');
const repository = new Repository("users");

async function authorize(req, res, isAdminOrNot) {
	try {
		const user = await repository.findOne({username: req.body.loginId});

		if (user) {
			const hashed = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
			const password = hashed.toString(CryptoJS.enc.Utf8);

			if (password === req.body.password && user.isActive && isAdminOrNot(user.isAdmin)) {
				const token = generateToken(user);

				if (user.isAdmin) {
					user.address = undefined;
					user.postcode = undefined;
					user.birthday = undefined;
					user.gender = undefined;
				}
				user.password = undefined;

				return {status: 200, user, token};
			}
			else {
				console.log("Invalid login [1]");
				return {status: 403, err: "Invalid login"};
			}
		}
		else {
			console.log("Invalid login [2]");
			return {status: 403, err: "Invalid login"};
		}
	}
	catch (err) {
		console.log("user-authorize[error]:", err.message);
		return {status: 500, err: err.message};
	}
}

function authenticate(req) {
	try {
		const auth = req.headers.authorization;

		if (!auth) return {status: 401, err: "Invalid authorization [1]"};
		const token = auth.split(' ')[1];
		let returned;
		
		JWT.verify(token, process.env.JWT_KEY, (err, parsed) => {
			if (err) {
				console.log("utilities-authenticate[error1]:", err.message);
				returned = {status: 403, err: "Invalid authentication [2]"};
			}

			returned = {status: 200, parsed};
		});
		
		return returned;
	}
	catch (err) {
		console.log("utilities-authenticate[error2]:", err.message);
		return {status: 500, err: err.message};
	}
}

function generateToken(user) {
	return JWT.sign({
		id: user._id,
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin,
		isSuper: user.isSuper,
	}, process.env.JWT_KEY, {expiresIn: "1d"});
}

function respond(res, returned) {
	(returned.status === 200) && res.status(returned.status).json(returned.result);
	(returned.status === 201) && res.status(returned.status).json(returned.result);
	//----
	(returned.status === 400) && res.status(returned.status).json(returned.err || {});
	//----
	(returned.status === 401) && res.status(returned.status).json(returned.err);
	(returned.status === 403) && res.status(returned.status).json(returned.err);
	//----
	(returned.status === 500) && res.status(returned.status).json(returned.err);
}

module.exports = {authorize, authenticate, generateToken, respond};