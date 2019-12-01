//express
const express = require("express");

//environment variables
process.env.NODE_ENV = "development";

//config
const config = require("../config/config.js");

//db
const db = require("../database/index.js");

//module
const app = express();

app.get("/global", (req, res) => {
  res.json(global.gConfig);
});

app.listen(global.gConfig.node_port, () => {
  console.log(
    `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
  );
});
