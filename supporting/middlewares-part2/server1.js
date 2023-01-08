const {customMiddleware, acceptJsonOnly, errorHandler, handlerAfterError, handlerBeforeResponse} = require('./middlewares');
const express = require('express');
const app = express();
app.listen(process.env.PORT || 5000, () => console.log("Server started"));

app.use("/test111", function (req, res, next) {
  console.log("use 'test111-A'");
  //res.end();
  //res.status(201).end();
  //res.send("testing 123");
  //res.status(500).send("Server error");
  //res.json({aaa: "AAA", bbb: "BBB", ccc: "CCC"});
  //res.status(400).json({aaa: "AAA", bbb: "BBB", ccc: "CCC"});
  next();
});

app.use("/test111", function (req, res, next) {
  console.log("use 'test111-B'");
  res.end();
  //next();
});

app.use(customMiddleware);

app.use("/test222", function (req, res, next) {
  console.log("use 'test222'");
  next();
});

app.get("/test111", function (req, res) {
   console.log("GET API: test111");
   res.send("testing 111");
});

app.get("/test222", function (req, res) {
   console.log("GET API: test222");
   res.send("testing 222");
});

app.post("/test333", acceptJsonOnly, function (req, res) {
   console.log("POST API: test333");
   res.send("testing 333");
});

app.post('/test444', (req, res) => {
  const error = new Error(`Error-1 [URL: ${req.url}]`);
  throw error;
});

app.post('/test555', (req, res, next) => {
  console.log("POST API: test555");
  next();
});

app.use(errorHandler);
app.use(handlerAfterError);
app.use(handlerBeforeResponse);