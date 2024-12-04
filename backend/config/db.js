 const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {})
        .then(() => console.log('DB Connected'))
        .catch((err) => console.log(err));
}