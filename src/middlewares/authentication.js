const jwt = require("jsonwebtoken");


const Auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        let token = header && header.replace("Bearer ", "");

        if (!token) {
            return res.send({
                status: "Failed",
                message: "Access Denied"
            })
        };

        const secretKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, secretKey);

        req.userId = verified.id;
        next();
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "failed",
            message: "Server Errror"
        })
    }
}


module.exports = Auth