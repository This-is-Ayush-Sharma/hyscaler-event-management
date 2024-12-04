const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { connect } = require('./config/db');
require('dotenv').config();

const port = 3000;
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
    connect();
    console.log("Server started on port " + port)
});
