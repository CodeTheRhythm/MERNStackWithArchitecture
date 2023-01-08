const {authenticate, respond} = require('./utilities');

function authenticateSuper(req, res, next) {
	const returned = authenticate(req);

	if (returned.status === 200) {
		if (returned.parsed.isSuper) {
			next();
		}
		else {
			respond(res, {status: 403, err: "Operation is disallowed"});
		}
	}
	else {
		return respond(res, returned);
	}
}

function authenticateAdmin(req, res, next) {
	const returned = authenticate(req);

	if (returned.status === 200) {
		if (returned.parsed.isAdmin) {
			next();
		}
		else {
			respond(res, {status: 403, err: "Operation is disallowed"});
		}
	}
	else {
		return respond(res, returned);
	}
}

function authenticateAll(req, res, next) {
	const returned = authenticate(req);

	if (returned.status === 200) {
		next();
	}
	else {
		return respond(res, returned);
	}
}

module.exports = {authenticateSuper, authenticateAdmin, authenticateAll};