const express = require('express');
const router = express.Router();
const knex = require('../knex')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
    if (decoded) {
    knex('posts')
      .join('users', 'users.id', '=', 'posts.user_id')
      .join('comments', 'comments.post_id', '=', 'posts.id')
      .select('posts.id as post_id', 'posts.title', 'posts.content', 'users.username as post_author', 'posts.created_at as pca', 'comment', 'comments.created_at as cca')
      .where('deleted', false)
      .then((data) => {
        data.forEach(el => {
          el.pca = el.pca.toString().substring(0, 15)
          el.cca = el.cca.toString().substring(4, 25)
        })
        res.render('posts', {
          'data': data
        })
      }).catch(err => {
        console.log(`Whoops ${err}`);
      })
    } else {
      res.redirect('/')
    }
  })
});

// select u.username as author, p.id as post_id, (select username from users ui where ui.id=c.user_id) comment_user_id, c.comment from users u, posts p, comments c where p.user_id = u.id and c.post_id = p.id;

router.delete('/', (req, res, next) => {
  let id = Number.parseInt(req.body.id)
  knex('posts')
    .where('id', id)
    .update({
      deleted: true
    }).then((post) => {
      return knex('posts')
        .where('deleted', false)
        .then((data) => {
          res.send({ stuff: 'stuff'});
        })
    })
})

router.patch('/', (req, res, next) => {
  
})

module.exports = router;
