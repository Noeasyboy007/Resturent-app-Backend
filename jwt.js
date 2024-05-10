const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    //Extract the jwwt token from request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).jsion({ error: "Unauthorized" });

    try {
        //Verify the JWT TOKEN 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" })
    }
}

//Function to generte jwt token
const generateToken = (userData) => {
    //Generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET)
}

module.exports = { jwtAuthMiddleware, generateToken };