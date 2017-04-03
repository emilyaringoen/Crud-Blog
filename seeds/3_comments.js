
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comment: 'Great story. Got suckered in.', user_id: 2 , post_id: 1},
        {comment: 'I think the movie was better.', user_id: 1, post_id: 2},
        {comment: 'What a deep and meaningful book.', user_id: 3, post_id: 3},
        {comment: 'Another thoughtful comment.', user_id: 1, post_id: 2},
        {comment: 'Blah, blah, blah, loreum epsum.', user_id: 2, post_id: 1}
      ]);
    });
};
