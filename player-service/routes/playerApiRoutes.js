const express = require("express")
const router = express.Router()
const playerApiController = require("./../controllers/playerApiController")


router.route('/addPlayer').post(playerApiController.addPlayer)
router.route('/deletePlayer').delete(playerApiController.deletePlayer)

module.exports = router