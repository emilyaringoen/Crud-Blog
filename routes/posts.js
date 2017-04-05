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
          console.log('POSTS', posts);
          res.render('posts', {
            'data': posts
          })
        })
    } else {
      res.redirect('/')
    }
  })
});

const postAndAuthor = (something) => {
  console.log('postAndAuthor');
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
    }).catch((err) => {
      next(err)
    })
}

const commentAndPost = (posts) => {
return posts.map((post) => {
  console.log('post here', post);
  return knex('posts')
    .select('comment')
    .join('comments', 'comments.post_id', '=',
      'posts.id')
    .then((com) => {
      if (com.length > 0) {
        post.comment = com
        return post
      } else {
        return post
      }
    })
})
}

const commentAndUser = (posts) => {
return posts.map((post) => {
  console.log('commentAndUser', post);
  return knex('comments')
    .select('users.username as comment_author')
    .join('users', 'users.id', '=', 'comments.user_id')
    .then((user) => {
      if (user.length > 0) {
        post.comment_author = user
        return post
      } else {
        return post
      }
    })
})
}

const wholePost = () => {
  return postAndAuthor()
      .then(commentAndPost)
      .then(commentAndUser)
    }


// This one works, uncomment as needed!
// router.get('/', (req, res, next) => {
//   jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
//     if (decoded) {
//       knex('posts')
//         .join('users', 'users.id', '=', 'posts.user_id')
//         .select('posts.id as post_id', 'posts.title', 'posts.content', 'users.username as post_author', 'posts.updated_at as pca')
//         .where('deleted', false)
//         .orderBy('pca', 'DESC')
//         .then((data) => {
//           data.forEach(el => {
//             el.pca = el.pca.toString().substring(0, 15)
//           })
//           res.render('posts', {
//             'data': data
//           })
//         }).catch(err => {
//           console.log(`Whoops ${err}`);
//         })
//     } else {
//       res.redirect('/')
//     }
//   })
// });
//
// router.get('/', (req, res, next) => {
//   jwt.verify(req.cookies.token, 'shhhh', (err, decoded) => {
//     if (decoded) {
//       knex('posts')
//         .join('users', 'users.id', '=', 'posts.user_id')
//         .select('posts.id as post_id', 'posts.title', 'posts.content', 'users.username as post_author', 'posts.updated_at as pca')
//         .where('deleted', false)
//         .orderBy('pca', 'DESC')
//         .then(() => {
//           data.forEach(el => {
//             el.pca = el.pca.toString().substring(0, 15)
//           })
//           res.render('posts', {
//             'data': data
//           })
//         }).catch(err => {
//           console.log(`Whoops ${err}`);
//         })
//     } else {
//       res.redirect('/')
//     }
//   })
// });


// select u.username as author, p.id as post_id, (select username from users ui where ui.id=c.user_id) comment_user_id, c.comment from users u, posts p, comments c where p.user_id = u.id and c.post_id = p.id;

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
