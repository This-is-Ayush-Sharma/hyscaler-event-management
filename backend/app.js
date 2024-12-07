require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { connect } = require('./config/db');
const cors = require('cors');
const axios = require("axios");



const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
    connect();
    console.log("Server started on port " + port);
});

// to make deployment run on (onrender)
const autoHitApi = () => {
    axios.get("https://hyscaler-event-management.onrender.com/health")
        .then((response) => {
            console.log(response.data);
        });
}
setInterval(autoHitApi, 120000);
