exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('username').notNullable().defaultTo();
    table.text('email').notNullable().defaultTo('');
    table.string('password', 255).notNullable();
    table.text('profile_pic').notNullable().defaultTo('http://i3.kym-cdn.com/photos/images/facebook/000/437/645/a9d.jpg');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
