const express = require("express")
const Authenticate = require("../config/passport-jwt")
const {sendMessage, allMessages} = require("../controller/messageController")

const router = express.Router();

router.route("/").post(Authenticate, sendMessage);
router.route("/:chatId").post(Authenticate, allMessages)


module.exports = router
