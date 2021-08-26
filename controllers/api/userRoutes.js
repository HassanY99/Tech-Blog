const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/loggedin");


router.get("/", async (req, res) => {
  const UserDataDb = await User.findAll({
    attributes: { exclude: ["password"] },
  }).catch((err) => {
    res.status(500).json(err);
  });
  if (!UserDataDb[0]) {
    res.status(404).json({ message: "There are no users!" });
    return;
  }
  res.json(UserDataDb);
});



router.get("/:id", async (req, res) => {
  const UserDataDb = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  if (!UserDataDb) {
    res.status(404).json({ message: `No user found by ID ${req.params.id}` });
    return;
  }
  res.json(UserDataDb);
});



router.post("/", async (req, res) => {
  const UserDataDb = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  req.session.save(() => {
    req.session.user_id = UserDataDb.id;
    req.session.username = UserDataDb.username;
    req.session.loggedIn = true;

    res.json(UserDataDb);
  });
});


router.put("/:id", withAuth, async (req, res) => {
  const UserDataDb = await User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  if (!UserDataDb[0]) {
    res.status(404).json({ message: `No user found by ID ${req.params.id}` });
    return;
  }
  res.json(UserDataDb);
});


router.delete("/:id", withAuth, async (req, res) => {
  const UserDataDb = await User.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  if (!UserDataDb) {
    res.status(404).json({ message: `No user found by ID ${req.params.id}` });
    return;
  }
  res.json({ message: `User Deleted by ID of ${req.params.id}` });
});


router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((UserDataDb) => {
    if (!UserDataDb) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = UserDataDb.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = UserDataDb.id;
      req.session.username = UserDataDb.username;
      req.session.loggedIn = true;

      res.json({ user: UserDataDb, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;