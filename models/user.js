import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname: String,
    initial: String,
    lastname: String,    
    email: String,
    password: String,
    role: String,
    orders: [{
        type: String,   // refers order._id from order model
        ref: 'order._id'
    }]
});

export default mongoose.model("user", userSchema);