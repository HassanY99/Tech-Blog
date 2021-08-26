const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/loggedin");


router.get("/", async (req, res) => {
  const PostDataDb = await Post.findAll({
    attributes: ["id", "title", "created_at", "post"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  if (!PostDataDb[0]) {
    return res.json({ message: "There is no Post Data" });
  }
  res.json(PostDataDb);
});


router.get("/:id", async (req, res) => {
  const PostDataDb = await Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "post"],
    include: [
      
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  if (!PostDataDb) {
    res.status(404).json({ message: `No post found with ID ${req.params.id}` });
    return;
  }
  res.json(PostDataDb);
});


router.post("/", withAuth, async (req, res) => {
  const PostDataDb = await Post.create({
    title: req.body.title,
    post: req.body.post,
    user_id: req.session.user_id,
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  res.json(PostDataDb);
});


router.put("/:id", withAuth, async (req, res) => {
  const PostDataDb = await Post.update(
    {
      title: req.body.title,
      post: req.body.post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  if (!PostDataDb[0]) {
    res.status(404).json({ message: `No post found with ID ${req.params.id}` });
    return;
  }
  res.json(PostDataDb[0]);
});



router.delete("/:id", withAuth, async (req, res) => {
  const PostDataDb = await Post.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

  if (!PostDataDb) {
    res.status(404).json({ message: `No post found with ID ${req.params.id}` });
    return;
  }
  res.json(PostDataDb);
});

module.exports = router;