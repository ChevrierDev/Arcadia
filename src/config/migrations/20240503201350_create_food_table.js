exports.up = function(knex) {
    return knex.schema.createTable('food', table => {
      table.increments('food_id').primary(); 
      table.string('name', 250).notNullable();
      table.string('type', 250).notNullable();
      table.integer('quantity');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('food'); 
  };
  