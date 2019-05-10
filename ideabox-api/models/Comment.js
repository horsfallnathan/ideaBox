const mongoose = require('mongoose');
const Schema = mongoose.Schema;

commentSchema = new Schema({
    content: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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