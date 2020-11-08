import mongoose from 'mongoose';

const userSchema = mongoose.Schema({    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orders: [{
        type: String,   
        ref: 'order._id'    // refers order._id from order model
    }]
});

const User = mongoose.model("user", userSchema);
export default User;