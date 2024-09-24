const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

//   import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const verifyToken = require("./api/middlewares/verifyToken");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`your server is running at http://localhost:${port}`);
});
