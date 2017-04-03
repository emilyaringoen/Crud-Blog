const express = require('express')
const router = express.Router()
const boom = require('boom')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const saltrounds = 10

router.get('/', (req, res, next) => {
  res.render('newuser')
})

router.post('/', (req, res, next) => {
  if (!req.body.email || req.body.email.trim() === '') {
    return next(boom.create(400, 'Email must not be blank'))
  } else if (!req.body.password || req.body.password.trim() === '') {
    return next(boom.create(400, 'Password must be at least 8 characters long'))
  }

  knex('users')
    .where('username', req.body.username)
    .then((exists) => {
      if (exists.length > 0) {
        res.render('newuser', {
          error: 'Username is already taken.'
        })
      } else {
        knex('users')
          .returning(['id', 'username', 'password', 'email'])
          .insert({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltrounds),
            email: req.body.email,
            profile_pic: req.body.profile_pic
          }).then((user) => {
            res.redirect('newpost')
          })
      }
    })
})




module.exports = router;
