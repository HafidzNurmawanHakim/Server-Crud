const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friend");
const { body } = require("express-validator");

router.get("/friends", friendController.getAllFriends);

router.get("/friends/:postId", friendController.getFriendById);

router.delete("/friends/:postId", friendController.deleteFriend);

router.post("/make-friend", [body("name").isLength({ min: 2 }).withMessage("Nama minimal 2 karakter!"), body("email").isEmail().withMessage("Email tidak sesuai!")], friendController.makeFriend);

router.put("/friends/:postId", [body("name").isLength({ min: 2 }).withMessage("Nama minimal 2 karakter!"), body("email").isEmail().withMessage("Email tidak sesuai!")], friendController.updateFriend);

module.exports = router;
