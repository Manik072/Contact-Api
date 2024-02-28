const express = require("express")

const router = express.Router();

const {getContacts,getSingleContact,updateContact,deleteContact,createContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandle");

router.use(validateToken)

router.route("/").get(getContacts);

router.route("/").post(createContact); 

router.route("/:id").get(getSingleContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;