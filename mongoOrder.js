import mongoose from 'mongoose';

const orderModel = mongoose.Schema({
    userID: String,
    paymentIntentID: String,
    basket: [
        {
            id: Number,
            title: String,
            price: Number,
            image: String
        }
    ],
    amount: Number,
    created: String
});

export default mongoose.model("orders", orderModel);