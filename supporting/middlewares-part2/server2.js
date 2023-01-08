const {customMiddleware, acceptJsonOnly, errorHandler, handlerAfterError, handlerBeforeResponse} = require('./middlewares');
const express = require('express');
const app = express();
app.listen(process.env.PORT || 5000, () => console.log("Server started"));

app.post('/test444', (req, res) => {
  const error = new Error(`Error-1 [URL: ${req.url}]`);
  throw error;
});

app.post('/test555', (req, res, next) => {
  console.log("POST API: test555");
  next("ABC");
});

app.post('/test666', (req, res, next) => {
  console.log("POST API: test666");
  next();
});

app.use(function (req, res, next) {
  console.log("do something 1");
  res.end();
});

app.use(function (param, req, res, next) {
  console.log(`do something 2 [param: ${param}]`);
  res.end();
});