const express = require('express');
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltrounds = 10

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.query.unauthorized) {
    console.log(req.query.unauthorized);
    res.render('index', {
      error: 'Unauthorized: please login.'
    })
  }
  res.render('index');
});

router.post('/', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  if (req.body.username === '' || req.body.password === '') {
    res.render('index', {
      error: 'Username & Password Required'
    })
  } else {
    knex('users')
      .where('username', username)
      .select()
      .then((data) => {
        if (data.length > 0) {
          bcrypt.compare(password, data[0].password, (err, boolean) => {
            if (boolean) {
              let token = jwt.sign({
                username: data[0].username,
                password: data[0].password
              }, 'shhhh', { expiresIn: '1h' })
              res.cookie('token', token, {
                httpOnly: true
              })
              res.cookie('userID', data[0].id, {
                httpOnly: true
              })
              res.redirect('/posts')
            } else {
              console.log('here');
              res.render('index', {
                error: 'Username or Password Incorrect'
              })
            }
          })
        } else {
          res.render('index', {
            error: 'Username or Password Incorrect'
          })
        }
      })
  }
})

module.exports = router;
