require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { connect } = require('./config/db');
const cors = require('cors');



const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
    connect();
    console.log("Server started on port " + port)
});
