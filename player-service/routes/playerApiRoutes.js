const express = require("express")
const router = express.Router()
const playerApiController = require("./../controllers/playerApiController")


router.route('/addPlayer').post(playerApiController.addPlayer)
router.route('/deletePlayer').delete(playerApiController.deletePlayer)
router.route('/getAllPlayers').get(playerApiController.getAllPlayers)
router.route('/getPlayer').get(playerApiController.getPlayer)
router.route('/updatePlayer').post(playerApiController.updatePlayer)

module.exports = router