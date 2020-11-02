export default (req, res, next) => {
    console.log("req.user: ", req.user);
    if (req.user == null) {
        res.status(403);
        return res.send('You need to sign in');
    }
    next();
};