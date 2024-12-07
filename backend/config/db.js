 const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(`${process.env.DB_URI}`, {
        dbName: "EventManager",
    })
        .then(() => console.log('DB Connected'))
        .catch((err) => console.log(err));
}