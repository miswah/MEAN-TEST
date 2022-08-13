const express = require("express");
const router = express.Router();

/**Import Middlewares */
const cleanBody = require("../middlewares/cleanbody");

const multer = require("multer");
let storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

/**Controller Import */
const UserController = require("../src/users/users.controller");

/**Define Routes */
router.post(
  "/create",
  cleanBody,
  upload.single("image"),
  UserController.Create
);

router.get("/all", cleanBody, UserController.GetList);
router.get("/:id", cleanBody, UserController.GetUser);
router.post(
  "/update/:id",
  cleanBody,
  upload.single("image"),
  UserController.Update
);

module.exports = router;
