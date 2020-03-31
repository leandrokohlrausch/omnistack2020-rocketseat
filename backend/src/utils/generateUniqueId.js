const crypto = require('crypto');

function generateUniqueId () {
    const id = crypto.randomBytes(4).toString('HEX');
    return id;
}

module.exports = generateUniqueId;