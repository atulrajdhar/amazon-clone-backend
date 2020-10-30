import User from '../models/user.js';

export default {
    index: async (req, res) => {
        const users = await User.find();        
        res.status(200).json(users);
    },

    newUser: async (req, res) => {
        const user = new User(req.body);        
        await user.save();
        res.status(201).json(user);   
    }
};