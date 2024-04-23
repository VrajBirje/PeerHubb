const express = require("express")
const {accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controller/chatControllers")
const Authenticate = require("../config/passport-jwt")

const router = express.Router();

router.route("/").post(Authenticate, accessChat); // DM - if user DM not DM before will create new else retrive the already created .
router.route("/fetch").post(Authenticate, fetchChat) // Fetch all chats of the logged in user.
router.route("/group").post(Authenticate, createGroupChat)
router.route("/rename").put(Authenticate, renameGroup)
router.route("/groupadd").put(Authenticate, addToGroup)
router.route("/groupremove").put(Authenticate, removeFromGroup)


module.exports = router
