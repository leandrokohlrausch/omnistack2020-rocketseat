const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');
const constantsConfig = require('../config/constantsConfig');

module.exports = {
    async create (request, response) {
        const { email, password } = request.body;
        const ong = await connection('ongs').where('id', id).select('name').first();

        if (!ong) {
            return response.status(400).json({error: 'no ong found with id'});
        } else {
            return response.json(ong);
        }
    },
    async auth (request, response) {
        const { email, password } = request.body;
        const ong = await connection('ongs').where('email', email).select('*').first();

        if (!ong) {
            return response.status(400).json({error: 'no ong found with this email'});
        } else  {
            let compare = await bcrypt.compare(password, ong.password);
            if (!compare) {
                return response.status(401).json({error: 'password incorrect'})
            } else {
                ong.password = undefined;
                const token = jwt.sign({ id: ong.id }, constantsConfig.jwtsecret, {
                    expiresIn : constantsConfig.jwtMinutesExpired * 60
                });
                ong.token = token;
                return response.json(ong);
            }
        }
    }
}