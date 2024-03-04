const express = require("express")
const router = express.Router()
const apiController = require("./../controllers/apiController")

router.route('/allusers').get(apiController.getAllUser)
router.route('/getuserbyid').post(apiController.getUserById)
router.route('/getuser').post(apiController.getUserByUsername)
router.route('/login').post(apiController.loginUser)
router.route('/register').post(apiController.registerUser)

module.exports = router