const mongoose = require('mongoose');

const Connection = async() => {
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser : true,
        useFindAndModify : false,
        useUnifiedTopology : true,
    });
}

module.exports = Connection;