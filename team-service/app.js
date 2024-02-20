const express = require("express");
const app = express();
const path = require('path')
const hbs = require('hbs')

// Routes
const teamApiRoutes = require("././routes/teamApiRoutes")

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))


// Parse request bodies
app.use(express.json());

app.use('/api/team', teamApiRoutes)

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

// Register Partials
hbs.registerPartials(__dirname + '/views/partials')

module.exports = app;