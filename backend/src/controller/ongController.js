const connection = require('../database/connection');
const constantsConfig = require('../config/constantsConfig');
const bcrypt = require('bcrypt');

module.exports = {
    async create (request, response) {
        const { name, email, whatsapp, city, uf, password } = request.body;
        const hash = await bcrypt.hash(password, constantsConfig.bcryptSalt);
        await connection('ongs').insert({
            name,
            email,
            whatsapp,
            city,
            uf,
            password : hash
        });
        return response.json({ name, email });
    },
    async list (request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('ongs').count();
        const ongs = await connection('ongs')
        .limit(5)
        .offset( (page - 1) * 5)
        .select('name', 'email', 'whatsapp', 'city', 'uf', 'id');
        response.header('X-Total-Count', count['count(*)']);
        return response.json(ongs);
    }
};