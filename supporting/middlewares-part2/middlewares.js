const customMiddleware = (req, res, next) => {
  console.log("execute 'custom middleware'");
  next();
}

const acceptJsonOnly = (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json')
      res.status(400).send('Invalid content type');
  else
    next()
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message); 
  next(error);
}

const handlerAfterError = (error, req, res, next) => {
  console.log(`handlerAfterError [${error.message}]`); 
  res.status(500).send(error.message);
}

const handlerBeforeResponse = (req, res, next) => {
  console.log("do something before response");
  res.send("something has been done");
}

module.exports = {
	customMiddleware, 
	acceptJsonOnly, 
	errorHandler, 
	handlerAfterError, 
	handlerBeforeResponse
}