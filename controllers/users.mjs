import User from '../models/user';
import getBcryptHash from '../helpers/getBcryptHash';

export default {
    index: async (req, res) => {
        const users = await User.find();        
        res.status(200).json(users);
    },

    newUser: async (req, res) => {        
        const hashedPassword = getBcryptHash(req.body.password);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await user.save();
        res.status(201).json(user);
    }
};