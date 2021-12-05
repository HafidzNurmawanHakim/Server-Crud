const express = require("express");
const mongoose = require("mongoose");
const app = express();
const friendRouter = require("./src/routes/friend");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/", friendRouter);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb://hnh-labs:WB1DajTt6DW8Bcyt@cluster0-shard-00-00.ewa5f.mongodb.net:27017,cluster0-shard-00-01.ewa5f.mongodb.net:27017,cluster0-shard-00-02.ewa5f.mongodb.net:27017/Friends?ssl=true&replicaSet=atlas-t6tgwx-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("Connection Success"));
  })
  .catch((err) => console.log(err));
