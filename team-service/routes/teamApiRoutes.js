const express = require('express')
const router = express.Router()
const teamApiController = require("./../controllers/teamApiController")

router.route('/teams').get(teamApiController.getAllTeams)
router.route('/create-team').post(teamApiController.createTeam)
router.route('/get-team').post(teamApiController.getTeam)
router.route('/get-team-by-id').post(teamApiController.getTeamById)


module.exports = router;