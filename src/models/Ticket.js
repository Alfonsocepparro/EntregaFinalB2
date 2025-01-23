const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
