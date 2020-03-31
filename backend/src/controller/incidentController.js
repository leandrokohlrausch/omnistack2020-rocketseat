const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers['ong_id'];
        const record = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id: record});
    },
    async list (request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id') 
        .limit(5)
        .offset( (page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers['ong_id'];
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (!incident) return response.status(400).json({error: 'Incident not found for this id'});
        if (incident.ong_id != ong_id) return response.status(401).json({error: 'Operation Denied'});
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    } 
};