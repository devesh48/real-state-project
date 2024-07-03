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
    },
    photo: {
        required: false,
        type: String,
        default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F152-1520367_user-profile-default-image-png-clipart-png-download.png&f=1&nofb=1&ipt=0354c4a1ce0fd69c7a4b0ed9be4d70035b2a2d2565c7b8eab999a203ab9bc138&ipo=images"
    }
}, {timestamps: true});

const Estate = mongoose.model('Estate', estateSchema);

export default Estate;