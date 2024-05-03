exports.up = function(knex) {
    return knex.schema.createTable('service', table => {
      table.increments('service_id').primary(); 
      table.string('name', 250).notNullable();
      table.text('description').notNullable();
      table.specificType('images', 'bytea');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('service'); 
  };
  