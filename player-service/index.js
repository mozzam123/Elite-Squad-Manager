const app = require("./app")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./../config.env" });

const player_port = process.env.PLAYER_PORT;
const DB = process.env.DATABASE

mongoose.connect(DB)
    .then(() => {
        console.log("Database connected for Player service");
    }).catch((err) => {
        console.log(`Database error: ${err}`);
    })



app.listen(player_port, () => {
    console.log(`server running on http://127.0.0.1:${player_port}`);
});