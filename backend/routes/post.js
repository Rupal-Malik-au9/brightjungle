const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middlewares/requireLogin");

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });
// const upload = multer({ storage });

router.post("/createpost", requireLogin, (req, res) => {
  const { title, subTitle, photo, body } = req.body;
  //

  if (!title || !photo) {
    return res.status(422).json({ err: "All fields are mandatory" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    subTitle,
    photo,
    body,
    postedBy: req.user,
  });

  post.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ post: result });
    }
  });
});

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    // .populate("comments.postedBy", "_id name")
    .then((posts) => {
      if (!posts) {
        console.log(err);
      } else {
        res.json({ posts });
      }
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((post) => {
      if (!post) {
        res.status(404).json({ err: "No Post found" });
      } else {
        res.json({ post });
      }
    });
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ err });
      }
      if (post) {
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => console.log(err));
        }
      }
    });
});

router.get("/followerspost", requireLogin, (req, res) => {
  Post.find({
    postedBy: {
      $in: req.user.following,
    },
  })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    // .populate("comments.postedBy", "_id name")
    .then((posts) => {
      if (!posts) {
        console.log(err);
      } else {
        res.json({ posts });
      }
    });
});
router.get("/postdetail/:postid", requireLogin, (req, res) => {
  Post.find({ _id: req.params.postid })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    // .populate("comments.postedBy", "_id name")
    .then((post) => {
      if (!post) {
        console.log(err);
      } else {
        res.json({ post });
      }
    })
    .catch((err) => {
      return res.status(404).json({ err: "No post found" });
    });
});

router.delete("/deletecomment/:commentId", requireLogin, (req, res) => { });

module.exports = router;