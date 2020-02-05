const mongoose = require("mongoose");

const URI = "mongodb+srv://james:kElPLa0ypmj9xXw3@cluster0-tucj3.mongodb.net/test?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};


module.exports = InitiateMongoServer;