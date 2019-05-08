const mongoose = require('mongoose');
const Schema = mongoose.Schema;

commentSchema = new Schema({
    attachedTo: {
        startIndex: Number,
        endIndex: Number,
        color: String
    },
    content: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'comment'

    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;