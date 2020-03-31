
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('whatsapp').notNullable().unique();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
