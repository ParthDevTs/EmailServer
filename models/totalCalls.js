const mongoose = require('mongoose');

const totalCountSchema = new mongoose.Schema({
    hits: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("totalCountSchema", totalCountSchema);