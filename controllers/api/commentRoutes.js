const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/loggedin");


router.get("/", async (req, res) => {
  const CommentDataDb = await Comment.findAll({}).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  if (!CommentDataDb[0]) {
    return res.json({ message: "No Comment Data Found" });
  }
  res.json(CommentDataDb);
});



router.post("/", async (req, res) => {
  if (req.session) {
    const CommentDataDb = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
    res.json(CommentDataDb);
  }
});



router.delete("/:id", async (req, res) => {
  const CommentDataDb = await Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  if (!CommentDataDb) {
    res
      .status(404)
      .json({ message: `No comment found with ID ${req.params.id}` });
    return;
  }
  res.json(CommentDataDb);
});

module.exports = router;