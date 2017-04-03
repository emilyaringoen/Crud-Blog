const express = require('express');
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.get('/', (req, res, err) => {
  res.render('newpost')
})

router.post('/', (req, res, err) => {
  knex('posts')
    .insert({
      title: req.body.title,
      content: req.body.content,
      user_id: req.cookies.userID
    }).then((post) => {
      res.redirect('posts')
    })
})

module.exports = router;
