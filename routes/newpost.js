const express = require('express');
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const boom = require('boom')

router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
    if (decoded) {
      if (req.query.firstpost) {
        res.render('newpost', {
          instruction: 'To Get Started, Write Your First Post'
        })
      } else {
        res.render('newpost', {
          instruction: 'Write a New Post'
        })
      }
    } else {
      res.redirect('/?unauthorized=' + 'true')
    }
})

  router.post('/', (req, res, next) => {
    let now = new Date()
    knex('posts')
      .insert({
        title: req.body.title,
        content: req.body.content,
        user_id: req.cookies.userID,
        updated_at: now
      }).then((post) => {
        res.redirect('/posts')
      })
  })
})

module.exports = router;
