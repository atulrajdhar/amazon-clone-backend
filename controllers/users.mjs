import User from '../models/user';
import getBcryptHash from 'security';

export default {
    logout: async (req, res) => {
        const users = await User.find();        
        res.status(200).json(users);
    },

    signup: async (req, res) => {        
        // const hashedPassword = getBcryptHash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        await user.save();
        res.status(201).json({  
            _id: user._id,          
            username: user.username,
            email: user.email
        });
    },

    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.find({"username": username});
        res.status(200).json({  
            _id: user._id,          
            username: user.username,
            email: user.email
        });
    }
};