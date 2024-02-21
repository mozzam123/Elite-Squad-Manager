const express = require("express");
const app = express();
const path = require('path')
const hbs = require('hbs')

// Routes
const playerApiRoutes = require("./routes/playerApiRoutes")

console.log('running the app.js');
// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))

// Parse request bodies
app.use(express.json());

// Direct the routes
app.use('/api/player', playerApiRoutes)

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))


module.exports = app;