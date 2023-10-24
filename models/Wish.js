const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WishSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const Wish = mongoose.model("Wish", WishSchema);
module.exports = Wish