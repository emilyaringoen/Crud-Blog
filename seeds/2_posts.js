
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'Harry Potter', content: "Harry wandered over to the Restricted Section. He had been wondering for a while if Flamel wasn't somewhere in there. Unfortunately, you needed a specially signed note from one of the teachers to look in any of the restricted books, and he knew he'd never get one. These were the books containing powerful Dark Magic never taught at Hogwarts, and only read by older students studying advanced Defence Against the Dark Arts.", user_id: 1},
        {title: 'Hobbits', content: "It cannot be seen, cannot be felt, Cannot be heard, cannot be smelt, It lies behind stars and under hills, And empty holes it fills, It comes first and follows after, Ends life, kills laughter.", user_id: 2},
        {title: 'Yikes', content:'The most important things are the hardest to say. They are the things you get ashamed of, because words diminish them -- words shrink things that seemed limitless when they were in your head to no more than living size when they are brought out. But it is more than that, is not it? The most important things lie too close to wherever your secret heart is buried, like landmarks to a treasure your enemies would love to steal away. And you may make revelations that cost you dearly only to have people look at you in a funny way, not understanding what you have said at all, or why you thought it was so important that you almost cried while you were saying it. That is the worst, I think. When the secret stays locked within not for want of a teller but for want of an understanding ear.', user_id: 3}
      ]);
    });
};
