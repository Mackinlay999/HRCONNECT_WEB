const mongoose = require('mongoose');

const AptitudeRoundSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 4; 
            },
            message: 'Options array must contain exactly four elements'
        }
    },
    correctAnswer: {
        type: String,
        required: true
    }
});
const MCQ = mongoose.model('Aptitude Round(Employer)', AptitudeRoundSchema);

module.exports = MCQ;
