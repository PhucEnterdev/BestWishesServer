const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    avatar: {
        type: String,
        default: ""
    },
},{
    timestamps: true
})

const User = mongoose.model("User", UserSchema);
module.exports = User