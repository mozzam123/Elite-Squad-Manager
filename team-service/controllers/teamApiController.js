const Team = require("./../src/models/team")
const { StatusCodes } = require("http-status-codes");
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const user_endpoint = process.env.User_service_Endpoint

// Get All Teams
exports.getAllTeams = async (req, res) => {
    try {
        const allTeams = await Team.find()
        res.status(StatusCodes.ACCEPTED).json({
            status: "success",
            results: allTeams
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error
        })

    }
}

// Create New Team
exports.createTeam = async (req, res) => {
    try {
        // Use object destructuring directly with property names
        const { username, teamName } = req.body;

        // Check if the user exists
        const userResponse = await axios.post(`${user_endpoint}/api/getuser`, {
            username,
        });

        if (userResponse.data.status === 'error') {
            return res.json({ status: "error", message: "User not found" });
        }
        const userData = userResponse.data.result[0]
        console.log(userData._id);
        const existingTeam = await Team.find({ teamName: teamName, ownerId: userData._id })

        if (existingTeam.length > 0) {
            return res.json({ status: "error", message: "Team already exists" });
        }

        const newTeam = await new Team({
            teamName: teamName,
            ownerId: userData._id

        }).save()

        return res.json({ status: "success", result: newTeam })

    } catch (error) {
        // Handle errors and respond with an error status and reason
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error.message // Use error.message to get a more informative error message
        });
    }
};

// Get Single Team
exports.getTeam = async (req, res) => {
    try {
        const owner = req.body.owner
        const userTeam = await Team.find({ owner: owner }).populate('players')

        res.status(StatusCodes.ACCEPTED).json({
            status: "success",
            result: userTeam
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error.message // Use error.message to get a more informative error message
        });
    }
}