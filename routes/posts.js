const express = require('express');
const router = express.Router();
const knex = require('../knex')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
    if (decoded) {
      wholePost()
        .then((posts) => {
          res.render('posts', {
            'data': posts
          })
        })
    } else {
      res.redirect('/')
    }
  })
});

function postAndAuthor() {
  return knex('posts')
    .join('users', 'users.id', '=', 'posts.user_id')
    .select('posts.id as post_id', 'posts.title', 'posts.content', 'users.username as post_author', 'posts.updated_at as pca')
    .where('deleted', false)
    .orderBy('pca', 'DESC')
    .then((posts) => {
      posts.forEach(el => {
        el.pca = el.pca.toString().substring(0, 15)
      })
      return posts
    })
}

function commentAndPost(posts) {
  return Promise.all(posts.map((post) => {
    return knex('comments')
      .select('users.username as comment_author', 'comment as com', 'comments.updated_at as cca')
      .join('users', 'users.id', '=', 'comments.user_id')
      .where('post_id', post.post_id)
      .then((data) => {
        if (data.length > 0) {
          data.forEach(el => {
            el.cca = el.cca.toString().substring(4, 21)
          })
          post.comment = data;
          return post
        } else {
          return post
        }
      })
  }))

}

function wholePost() {
  return postAndAuthor()
    .then(commentAndPost)
}

router.post('/', (req, res, next) => {
  knex('comments')
    .insert({
      comment: req.body.comment,
      user_id: req.cookies.userID,
      post_id: 1
    }).then((data) => {
      res.render('/')
    })
})

router.put('/', (req, res, next) => {
  console.log(req.body);
  let now = new Date()
  let id = Number.parseInt(req.body.id)
  knex('posts')
    .where('id', id)
    .update({
      title: req.body.title,
      content: req.body.content,
      user_id: req.cookies.userID,
      updated_at: now
    }).then(() => {
      res.status(200).send(true);
    })
})

router.delete('/', (req, res, next) => {
  let id = Number.parseInt(req.body.id)
  knex('posts')
    .where('id', id)
    .update({
      deleted: true
    }).then((post) => {
      return knex('posts')
        .where('deleted', false)
        .then(() => {
          res.status(200).send(true);
        })
    })
})


module.exports = router;
