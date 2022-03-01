const url = require('url');

module.exports = (req, res, next) => {
    try {
        const { apiKey } = url.parse(req.url, true).query;
        if (!apiKey || apiKey !== process.env.SECRET_API_KEY) {
            throw 'Invalid api key';
        }
        next();
    } catch (error) {
        res.status(401).json({
            error
        });
    }
};
