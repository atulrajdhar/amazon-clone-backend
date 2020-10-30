import Order from '../models/order.js';

export default {
    index: async (req, res) => {
        const userID = req.query.userID;
        console.log(userID);
    
        const orders = await Order.find({'userID': userID});        
        orders.sort((b, a) => {
            return a.created - b.created;
        });
        res.status(200).json(orders);
    },

    placeOrder: async (req, res) => {
        const order = new Order(req.body);        
        await order.save();
        res.status(201).json(order);   
    }
};