const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
    text: {
        type: String, 
        required: true
    },

    articleName: {type: String, required: true},
    articleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Article",
        required: true,
    },
    
    commentatorName: {
        type: String, 
        required: true
    },

    commentatorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Comment", commentSchema);