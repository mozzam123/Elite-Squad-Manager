// models/team.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
