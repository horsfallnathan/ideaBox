const mongoose = require('mongoose');
const Schema = mongoose.Schema;

feedbackSchema = new Schema({
    attachedTo: {
        startIndex: Number,
        endIndex: Number,
        color: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'Feedback'

    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;