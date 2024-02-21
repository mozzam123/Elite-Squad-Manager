const playerModel = require("./../src/models/player")
const axios = require("axios")
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const player_endpoint = process.env.Player_service_Endpoint

// Add Player to the Team
exports.addPlayer = async (req, res) => {
    const teamId = req.body.teamId
    console.log(teamId);
    try {
        const apiResponse = await axios.post(`http://127.0.0.1:2222/api/team/get-team-by-id`, {
            teamId: teamId
        })
       
        res.json({ message: "mozzam" })

    } catch (error) {
        // Handle errors and respond with an error status and reason
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error.message // Use error.message to get a more informative error message
        });
    }
}