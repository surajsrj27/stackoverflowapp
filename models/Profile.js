const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    website: {
        type: String 
    },
    country: {
        type: String
    },
    languages: {
        type: [String]
    },
    portfolio: {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("myProfile", ProfileSchema);
