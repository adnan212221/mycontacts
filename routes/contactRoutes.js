const express = require("express");
const { getContact, getContacts, updateContact, createContact, deleteContact } = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


router.use(validateToken);

router.route("/").get(getContacts);

router.route("/:id").get(getContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
