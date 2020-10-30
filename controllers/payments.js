const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default {
    createPayment: async (req, res) => {
            const total = req.query.total;        
            console.log("Payment request recieved for this amount >>> ", total);
        
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total, // subunits of currency
                currency: "inr",
            });
            
            // OK - Created
            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
    }
};