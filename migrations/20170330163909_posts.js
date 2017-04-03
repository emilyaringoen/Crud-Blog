exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.text('title').notNullable();
    table.text('content').notNullable().defaultTo('');
    table.integer('user_id').references('users.id');
    table.boolean('deleted').notNullable().defaultTo(false)
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
