const express = require("express");

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/users", userController);

app.listen(5110, async () => {
  try {
    await connect();
    console.log("listening on port 5110");
  } catch (err) {
    console.error(err.message);
  }
  
});
