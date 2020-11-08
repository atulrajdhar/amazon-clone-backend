import User from '../models/user';
//import getBcryptHash from 'security';

export default {
    index: async (req, res) => {
        const users = await User.find();        
        res.status(200).json(users);
    },

    newUser: async (req, res) => {        
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

    getUser: async (req, res) => {        
        const userid = req.params.userID;
        const user = await User.findById(userid);
        res.status(200).json({  
            _id: user._id,          
            username: user.username,
            email: user.email
        });
    }
};