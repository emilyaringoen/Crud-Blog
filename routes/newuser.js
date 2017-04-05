const express = require('express')
const router = express.Router()
const boom = require('boom')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltrounds = 10

router.get('/', (req, res, next) => {
  res.render('newuser')
})

router.post('/', (req, res, next) => {
  if (!req.body.email || req.body.email.trim() === '') {
    return next(boom.create(400, 'Email must not be blank'))
  } else if (!req.body.password || req.body.password.trim() === '') {
    return next(boom.create(400, 'Password must be at least 8 characters long'))
  } else if (req.body.password !== req.body.confirm_password) {
    res.render('newuser', {
      error: 'Passwords do not match.'
    })
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
            let token = jwt.sign({ username: user[0].username, password: user[0].password }, 'shhhh')
            res.cookie('token', token, { httpOnly:true })
            res.cookie('userID', user[0].id, { httpOnly:true })
            res.redirect('newpost/?firstpost=true')
          })
      }
    })
})




module.exports = router;
