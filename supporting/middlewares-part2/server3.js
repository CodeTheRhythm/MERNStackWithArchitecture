const express = require('express');
const app = express();
app.listen(process.env.PORT || 5000, () => console.log("Server started"));

app.use(express.json());

app.use(function (req, res, next) {
  req.body.num += 10; 
  next();
});

app.get("/test123", function (req, res, next) {
  req.body.num += 5;
  console.log(`num: ${req.body.num}`);
  next();
});

app.use(function (req, res, next) {
  req.body.num += 2;
  res.send(`test result: ${req.body.num}`);
});