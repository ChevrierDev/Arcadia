const { text } = require("express");

exports.up = function(knex) {
    return knex.schema.createTable('habitat', table => {
      table.increments('habitat_id').primary(); 
      table.string('name', 250).notNullable();
      table.text('description').notNullable();
      table.text('veterinarian_comment')
      table.specificType('images', 'bytea');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('habitat'); 
  };
  