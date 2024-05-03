exports.up = function(knex) {
    return knex.schema.createTable('review', table => {
      table.increments('review_id').primary(); 
      table.string('pseudo', 250).notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.boolean('approved').notNullable().defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('review'); 
  };
  