import rateLimit from 'express-rate-limit';

const limitGet = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // 10 requests,
        standardHeaders: true, // Return rate limit info in the RateLimit- headers
        legacyHeaders: false, // Disable the 'X-RateLimit' legacy header
        message: (req, res) => {
            res.status(429).send({
                status: 429,
                message: "Too many requests from this IP, please try again after 15 minutes"
            });
        }
    });
};

const limitPost= () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // 10 requests,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) => req.headers["content-length"] > 400 ? (res.status(413).send({ status: 413, message: "Content too large" }), true) : false
    })
}

export {
    limitGet,
    limitPost
}