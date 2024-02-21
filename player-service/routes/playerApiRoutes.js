const express = require("express")
const router = express.Router()
const playerApiController = require("./../controllers/playerApiController")


router.route('/test').get(playerApiController.test)

module.exports = router