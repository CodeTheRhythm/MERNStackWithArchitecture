const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const express = require('express');
const app = express();

app.use(cors({exposedHeaders: ["login-token"]}));
app.use(express.json());
app.use(fileUpload());
app.use("/assets", express.static("common"));
app.use("/images", express.static("images"));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

mongoose.connect(process.env.CONNECTION_URL_OSE)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
