const { validationResult } = require("express-validator");
const Friend = require("../models/friend");

exports.makeFriend = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;

  const AddFriend = new Friend({
    name: name,
    email: email,
    age: age,
    gender: gender,
  });

  AddFriend.save()
    .then((result) => {
      res.status(201).json({
        message: "Add Friend Success!",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllFriends = (req, res, next) => {
  Friend.find()
    .then((result) => {
      res.status(200).json({
        message: "Get All Friends Success!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getFriendById = (req, res, next) => {
  const postId = req.params.postId;
  Friend.findById(postId)
    .then((result) => {
      if (!result) {
        const err = new Error("Friend Not Found!");
        err.errorStatus = 404;
        throw err;
      }
      res.status(200).json({
        message: "Get Friend Success!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateFriend = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;
  const postId = req.params.postId;

  Friend.findById(postId)
    .then((friend) => {
      if (!friend) {
        const err = new Error("Friend Not Found!");
        err.errorStatus = 404;
        throw err;
      }
      friend.name = name;
      friend.email = email;
      friend.age = age;
      friend.gender = gender;

      return friend.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Friend Success!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteFriend = (req, res, next) => {
  const postId = req.params.postId;

  Friend.findById(postId)
    .then((friend) => {
      if (!friend) {
        const err = new Error("Friend Not Found!");
        err.errorStatus = 404;
        throw err;
      }
      return Friend.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Delete Friend Success!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
