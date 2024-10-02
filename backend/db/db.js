const mongoose = require('mongoose');

/* 
    This function will connect to the database
    It will use the MONGO_URL environment variable to connect to the database
    If the connection is successful, it will log a message
    If there is an error, it will log the error
*/
const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {db};