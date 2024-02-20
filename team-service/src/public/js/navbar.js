const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const user_endpoint = process.env.User_service_Endpoint

function loginPage() {
    window.location.href = `${user_endpoint}/login`
}