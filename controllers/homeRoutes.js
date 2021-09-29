const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment, include: { model: User } }, { model: User }],
    })

    const posts = postData.map((post) => post.get({ plain:true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      header: "Tech Blog",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: { model: User },
    });

    const userData = await User.findByPk(req.session.user_id);
    const posts = postData.map((post) => post.get({ plain:true }));
    const username = userData.username;

    res.render("dashboard", {
      username,
      posts,
      logged_in: req.session.logged_in,
      header: "Dashboard",
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render("register", {
    logged_in: req.session.logged_in,
    header: "Tech Blog"
  });
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, include: { model: User } }, { model: User }]
    });

    if (!postData) {
      res.status(404).json({ message: "No post found" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post", {
      post,
      logged_in: req.session.logged_in,
      header: "Tech Blog"
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render("login", {
    logged_in: req.session.logged_in,
    header: "Tech Blog"
  });
});

module.exports = router;