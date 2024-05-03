exports.up = function(knex) {
    return knex.schema.createTable('health_record', table => {
      table.increments('health_record_id').primary(); 
      table.date('date').defaultTo(knex.fn.now());
      table.text('content').notNullable();
      table.text('detail_etat').notNullable();
      table.integer('animal_id').unsigned();
      table.foreign('animal_id').references('animal_id').inTable('animal');
      table.integer('veterinarian_id').unsigned();
      table.foreign('veterinarian_id').references('veterinarian_id').inTable('veterinarian');     
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('health_record'); 
  };
  