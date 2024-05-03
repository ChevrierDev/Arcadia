exports.up = function(knex) {
    return knex.schema.createTable('animal', table => {
      table.increments('animal_id').primary(); 
      table.string('name', 250).notNullable();
      table.string('race', 250).notNullable();
      table.specificType('images', 'bytea');
      table.integer('habitat_id').unsigned();
      table.foreign('habitat_id').references('habitat_id').inTable('habitat');
      table.string('etat', 2500)
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('animal'); 
  };
  