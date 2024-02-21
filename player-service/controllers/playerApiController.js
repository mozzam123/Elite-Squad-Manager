const playerModel = require("./../src/models/player")
const axios = require("axios")
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const team_endpoint = process.env.Team_service_Endpoint

// Add Player to the Team
exports.addPlayer = async (req, res) => {
    try {
        const teamId = req.body.teamId;
        const apiResponse = await axios.post(`${team_endpoint}/api/team/get-team-by-id`, {
            teamId,
        });

        // Check if the team is found based on the response status
        if (apiResponse.data.status === "success") {

            // check if Player already exist in the team
            const existingPlayer = await playerModel.find({ playerName: req.body.name, teamId: teamId })

            if (existingPlayer.length > 0) {
                return res.json({ message: "Player Already Exist" })
            }
            const newPlayer = await new playerModel({
                playerName: req.body.name,
                position: req.body.position,
                height: req.body.height,
                nationality: req.body.nationality,
                weight: req.body.weight,
                amount: req.body.amount,
                teamId: req.body.teamId
            }).save()

            return res.json({ status: "success", result: newPlayer })
        }


    } catch (error) {
        // Check if the error is due to a 404 status code
        if (error.response && error.response.status === 404) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "Team not found" });
        }

        // Handle other errors and respond with a generic error status and reason
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            reason: "Internal server error"
        });
    }
};

