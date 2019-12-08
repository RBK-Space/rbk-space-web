//express
const express = require("express");

//environment variables
process.env.NODE_ENV = "development";

//config
const config = require("../config/config.js");

//module
const app = express();
//routes
const routes = require("./routes/index");
app.use("/", routes);

app.listen(global.gConfig.node_port, () => {
  console.log(
    `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
  );
});
