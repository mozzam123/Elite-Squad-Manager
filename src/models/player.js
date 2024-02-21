// models/team.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    position: { type: String, required: true },
    height: { type: String, required: true },
    nationality: { type: String, required: true },
    weight: { type: Number, required: true },
    amount: { type: Number, required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
