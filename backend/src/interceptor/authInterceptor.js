const jwt = require('jsonwebtoken');
const constantsConfig = require('../config/constantsConfig');

const authInterceptor = (request, response, next) => {
    const token = request.headers.authorization;

    if (!token) return response.status(401).send({error: 'No token provider'}); 

    const n = token.startsWith("Bearer ");
    if (!n)  return response.status(401).send({error: 'Authorization token malformatted -> Bearer HASH_TOKEN'});

    const hash = token.replace("Bearer ", "");

    jwt.verify(hash, constantsConfig.jwtsecret, (err, decoded) => {
        if (err) return response.status(401).send({error: `Invalid Token ${hash}, err ${err}, decoded ${decoded}`}); 

        request.headers['ong_id'] = decoded.id;
        next();
    });
};

module.exports = authInterceptor;