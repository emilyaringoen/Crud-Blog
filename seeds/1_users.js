
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: 'J.K. Rowling', password: '$2a$10$1TqtrM2gmNM.TGUaZR50Ze.kKLg.OGGUBLhjj3JGckki5f50gQjoe', email: 'jkr@gmail.com', profile_pic: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR3nURqpgoPALMbDU4_Usfeuux5DDTICb8iDXrvk83y5nxhwXGqkA'}, //password
        {username: 'J.R.R. Tolkein', password: '$2a$10$dSPsO6lmnSRHVqD9mS7vJOjiNybiDQf8a69rjaloFzkrZ27jkV8Ye', email: 'tolkein@me.com', profile_pic: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQfGbOF1xDJ2VeF9tnX47Ig0OKYUoveXCOsYi5-uvw5X1fzovB0'}, //qwerty
        {username: 'Stephen King', password: '$2a$10$Fc.LzEYTQVz45lXPiZNlZeHITNWLEWierUxBSv5VPZu6f3GIamPTS', email: 's.king@hotmail.com'} //cookie
      ]);
    });
};
