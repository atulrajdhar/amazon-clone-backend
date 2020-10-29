import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({    
    paymentIntentID: String,
    basket: [
        {
            type: String,   // refers product._id from product model
            ref: 'product._id'
        }
    ],
    amount: Number,
    created: String,
    userID: {
        type: String,   // refers user._id from user model
        ref: 'user._id'
    }
});

export default mongoose.model("order", orderSchema);