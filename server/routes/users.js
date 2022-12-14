const express = require("express");
const router = express.Router();

/**Import Middlewares */
const cleanBody = require("../middlewares/cleanbody");

const multer = require("multer");
let storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
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
router.get("/image/:id", cleanBody, UserController.GetUserImage);
router.put(
  "/update/:id",
  cleanBody,
  upload.single("image"),
  UserController.Update
);
router.delete("/:id", cleanBody, UserController.delete);

module.exports = router;
