import mongoose, { mongo } from "mongoose";

const estateSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    }
}, {timestamps: true});

const Estate = mongoose.model('Estate', estateSchema);

export default Estate;