exports.up = function(knex) {
    return knex.schema.createTable('consommation', table => {
      table.increments('consommation_id').primary(); 
      table.date('date').defaultTo(knex.fn.now());
      table.time('heure').defaultTo(knex.fn.now());
      table.integer('grammage').notNullable();
      table.integer('animal_id').unsigned();
      table.foreign('animal_id').references('animal_id').inTable('animal');
      table.integer('employee_id').unsigned();
      table.foreign('employee_id').references('employee_id').inTable('employee');     
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('consommation'); 
  };
  