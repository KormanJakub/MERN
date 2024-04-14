const { Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema({
    text: {
        type: String, 
        required: true
    },
    
    reviewerName: {
        type: String, 
        required: true
    },

    reviewerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Review", reviewSchema);