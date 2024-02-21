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
            return res.status(StatusCodes.NOT_FOUND).json({ status: "error", message: "User not found" });
        }

        // Saving User response data
        const userData = userResponse.data.result[0]

        // check if team already exist
        const existingTeam = await Team.find({ teamName: teamName, ownerId: userData._id })

        if (existingTeam.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: "error", message: "Team already exists" });
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

// Get Single Team by Owner ID
exports.getTeam = async (req, res) => {
    try {
        const ownerId = req.body.ownerId
        const userTeam = await Team.find({ ownerId: ownerId })
        console.log(userTeam);

        if (userTeam.length == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: "error", reason: "Team does not found" })
        }

        return res.status(StatusCodes.ACCEPTED).json({
            status: "success",
            result: userTeam
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: "Owner Id does not exist"// Use error.message to get a more informative error message
        });
    }
}


// Get Single Team by Team ID
exports.getTeamById = async (req, res) => {
    try {
        const teamId = req.body.teamId;
        const userTeam = await Team.findById(teamId);

        if (userTeam) {
            return res.status(StatusCodes.ACCEPTED).json({
                status: "success",
                result: userTeam
            });
        }


    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            status: "error",
            reason: "Team not found"
            // You can use error.message to get a more informative error message if needed
        });
    }
};


