const playerModel = require("./../src/models/player")
const axios = require("axios")
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const team_endpoint = process.env.Team_service_Endpoint
const user_endpoint = process.env.User_service_Endpoint
const { sendKafkaMessage } = require("./../utils")


// Add Player to the Team
exports.addPlayer = async (req, res) => {
    try {
        const teamId = req.body.teamId;

        // Call the get-team-by-id endpoint
        const apiResponse = await axios.post(`${team_endpoint}/api/team/get-team-by-id`, {
            teamId,
        });

        // Check if the team is found
        if (apiResponse.data.status === 'success') {
            const teamDetails = apiResponse.data.result

            // check if player already exist or not
            const existingPlayer = await playerModel.find({ playerName: req.body.name, teamId: req.body.teamId })

            if (existingPlayer.length > 0) {
                return res.json({ status: "error", reason: "Player Already Exist" })
            }

            // Call the Get User by user id endpoint
            const userResponse = await axios.post(`${user_endpoint}/api/getuser`, {
                userId: teamDetails.ownerId,
            });

            // check if user balance is greater than player amount
            if (userResponse.data.result.balance < req.body.amount) {
                return res.json({ status: "error", reason: "Insufficient Balance" })
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

            // Send Kafka Message
            sendKafkaMessage('player-created', { id: teamDetails.ownerId, amount: newPlayer.amount })

            return res.status(StatusCodes.ACCEPTED).json({
                status: 'success',
                result: newPlayer, // Update with your response
            });
        }
    } catch (error) {
        // console.log("Error Response: ", error.response.data);

        // Check if the error is due to a 404 status code
        if (error.response && error.response.status === 404) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: error.response.data.reason });
        }

        // Handle other errors if needed
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            reason: error,
        });
    }
};


// Delete Player
exports.deletePlayer = async (req, res) => {
    try {
        console.log(req.query.id);
        const existingPlayer = await playerModel.findByIdAndDelete(req.query.id)
        console.log(existingPlayer);

        if (!existingPlayer) {
            return res.status(404).json({ status: "success", reason: "Player Does not Exist" })
        }

        return res.status(200).json({ status: "success", result: "Player Deleted" })


    } catch (error) {
        console.log('Error in deletePlayer endpoint: ', error);
        res.status(400).json({ status: "success", reason: "Id is not valid" })
    }
}
