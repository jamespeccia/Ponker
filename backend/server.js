const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const InitiateMongoServer = require("./config/db");


InitiateMongoServer();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/game", require("./routes/game"));
app.use("/users", require("./routes/users"));
app.listen(4000, () => console.log(`Ponker listening on port 4000!`));
