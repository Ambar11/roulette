require('dotenv/config');
// const jwt = require('jsonwebtoken');
const customError = require('../custom/errors');



const checkAdmin = (req, res, next, allowed, redirectTo) => {
    try {


        if (!allowed.includes(req.session.role)) throw customError.authFailed;
        next();

    } catch (error) {
        return res.status(error.code || 401).render(redirectTo);
    }
};

module.exports = { checkAdmin };