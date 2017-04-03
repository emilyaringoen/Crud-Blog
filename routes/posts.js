const express = require('express');
const router = express.Router();
const knex = require('../knex')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
    if (decoded) {
    knex('posts')
      .where('deleted', false)
      .then((data) => { res.render('posts', {
          'data': data
        });
      })
    } else {
      res.redirect('/')
    }
  })
});

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

module.exports = router;
