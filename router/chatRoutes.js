const express = require("express")
const {accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controller/chatControllers")
const Authenticate = require("../config/passport-jwt")

const router = express.Router();

router.route("/").post(Authenticate, accessChat);
router.route("/").get(Authenticate, fetchChat)
router.route("/group").post(Authenticate, createGroupChat)
router.route("/rename").put(Authenticate, renameGroup)
router.route("/groupadd").put(Authenticate, addToGroup)
router.route("/groupremove").put(Authenticate, removeFromGroup)


module.exports = router
