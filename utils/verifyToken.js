const jwt = require('jsonwebtoken');
const verifyToken = token =>{
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err){
            return false;
        } else{
            // decoded represent the actual or the original ID of the user
            return decoded;
        }
    });
}

module.exports = verifyToken;