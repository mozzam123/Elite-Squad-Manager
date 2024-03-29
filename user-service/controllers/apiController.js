const User = require("./../src/models/userModel")
const { authenticateUser } = require("./../utils")


// Login User
exports.loginUser = async (req, res) => {
    try {
        const existingUser = await authenticateUser(req.body.username, req.body.password)

        if (!existingUser) {
            return res.status(401).json({ error: "Invalid Credentials!!" })
        }
        return res.status(200).json({ message: "success", username: existingUser.username })
    } catch (error) {
        console.log(error);
    }

}

// Register user
exports.registerUser = async (req, res) => {
    try {
        const existingUser = await authenticateUser(req.body.username, req.body.password)
        if (existingUser) {
            return res.status(404).json({ message: "User already Exist!!" })
        }

        const userData = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }).save()

        console.log(`New user saved with username: ${userData.username} and password: ${userData.password} and Balance:  ${userData.balance}`);

        return res.status(200).json({ message: userData })

    } catch (error) {
        console.log("*****Error in Register endpoint*****", error);
        return res.status(400).json({ message: error })
    }
}

// Get All User
exports.getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json({ status: "success", result: allUsers })

    } catch (error) {
        console.error("Error is: ", error)
        // res.status(400).json({ status: "error", message: error })
    }
}

// Get User By ID
exports.getUserById = async (req, res) => {
    try {
        const userInfo = await User.findById(req.body.userId)
        if (userInfo) {
            res.status(200).json({ status: "success", result: userInfo })
        }

    } catch (error) {
        console.error("Error in Get User By Username: ", error)
        res.status(404).json({ status: "error", reason: "User does not found" })
    }
}

// Get User By username
exports.getUserByUsername = async (req, res) => {
    try {
        const userInfo = await User.find({ username: req.body.username })
        if (userInfo.length <= 0) {
            return res.status(404).json({ status: "error", reason: "User does not found" })
        }
        return res.status(200).json({ status: "success", result: userInfo })
        
    } catch (error) {
        console.error("Error in Get User By Username: ", error)
        res.status(400).json({ status: "error", reason: error })
    }
}