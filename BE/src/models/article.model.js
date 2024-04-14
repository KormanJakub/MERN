const { Schema, default: mongoose } = require("mongoose");

const articleSchema = new Schema({
    name: {
        type: String, 
        required: true
    },

    text: {
        type: String, 
        required: true
    },

    userName: {
        type: String, 
        required: true
    },

    userId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User", 
        required: true
    },

    publicationTime: {
        type: Date, 
        required: true
    },
});

module.exports = mongoose.model("Article", articleSchema);