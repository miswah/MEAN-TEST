/**Setup Imports */
const Joi = require("joi");
const mongooes = require("mongoose");
/**Model Import */
const User = require("./user.model");

/**Schema Validation */
const UserSchema = Joi.object().keys({
  First_Name: Joi.string().required(),
  Last_Name: Joi.string().required(),
  Email: Joi.string().email({ minDomainSegments: 2 }).required(),
  Phone: Joi.number().required(),
  Image_Name: Joi.string().required(),
});

const UserUpdateSchema = Joi.object().keys({
  First_Name: Joi.string(),
  Last_Name: Joi.string(),
  Email: Joi.string().email({ minDomainSegments: 2 }),
  Phone: Joi.number(),
  Image_Name: Joi.string(),
});

/**Validate Schema and Create New User */
exports.Create = async (req, res) => {
  try {
    const { headers, body, file } = req;

    // check if req is content-type multipart/form-data
    const payload = { headers, file, body };

    if (!req.is("multipart/form-data")) {
      console.error("415", payload);
      return res
        .status(415)
        .json({ ...payload, error: "Not multipart/form-data" });
    }

    body.Image_Name = file.originalname;

    //check for request body valdiation
    const result = UserSchema.validate(req.body);

    //throw error if validation fails
    if (result.error) {
      console.log(
        "User Create request body validation error",
        result.error.message
      );
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    //Save the fresh user
    const newUser = new User(result.value);
    await newUser.save();

    return res.json({
      error: false,
      status: 200,
      message: "New User Added",
    });
  } catch (error) {
    console.error("User-creation-error", error);
    return res.status(500).json({
      error: true,
      message: "Could not save new User Email already exists",
    });
  }
};

/**Get List of Users */
exports.GetList = async (req, res) => {
  try {
    //Fetch data from db
    const users = await User.find(
      {},
      "First_Name Last_Name Email Phone createdAt updatedAt"
    );

    //send data in proper formate if data exists
    return res.json({
      error: false,
      status: 200,
      message: users,
    });
  } catch (error) {
    console.error("User-fetch-all-error", error);
    return res.status(500).json({
      error: true,
      message: "Couldn't Find Users",
    });
  }
};

/**Get User Data */
exports.GetUser = async (req, res) => {
  try {
    //fetch entity id from request params
    const userId = req.params.id;

    //check if the entity id exists
    if (!userId) {
      return res.json({
        error: false,
        status: 404,
        message: "user Id doesn't exists",
      });
    }

    //Check if the entity id is valid
    if (!mongooes.Types.ObjectId.isValid(userId)) {
      return res.json({
        error: true,
        status: 400,
        message: "Invalid user id",
      });
    }

    //Fetch data from db
    const users = await User.findById(userId);

    if (!users) {
      return res.status(404).json({
        error: true,
        message: "User Not Valid",
      });
    }

    //send data in proper formate if data exists
    return res.json({
      error: false,
      status: 200,
      message: users,
    });
  } catch (error) {
    console.error("User-fetch-error", error);
    return res.status(500).json({
      error: true,
      message: "Couldn't Find User",
    });
  }
};

/**Update User */
exports.Update = async (req, res) => {
  try {
    const { headers, body, file } = req;

    // check if req is content-type multipart/form-data
    const payload = { headers, file, body };

    if (!req.is("multipart/form-data")) {
      console.error("415", payload);
      return res
        .status(415)
        .json({ ...payload, error: "Not multipart/form-data" });
    }
    if (file) {
      body.Image_Name = file.originalname;
    }

    //check for request body valdiation
    const result = UserUpdateSchema.validate(req.body);

    //throw error if validation fails
    if (result.error) {
      console.log(
        "User Update request body validation error",
        result.error.message
      );
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    //fetch entity id from request params
    const userId = req.params.id;

    //check if the entity id exists
    if (!userId) {
      return res.json({
        error: false,
        status: 404,
        message: "user Id doesn't exists",
      });
    }

    //Check if the entity id is valid
    if (!mongooes.Types.ObjectId.isValid(userId)) {
      return res.json({
        error: true,
        status: 400,
        message: "Invalid user id",
      });
    }

    //Save the fresh user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true }
    );

    if (!user) {
      return res.json({
        error: true,
        status: 400,
        message: "User Not Updated",
      });
    }

    return res.json({
      error: false,
      status: 200,
      message: "User Updated",
    });
  } catch (error) {
    console.error("User-creation-error", error);
    return res.status(500).json({
      error: true,
      message: "Could not save new User Email already exists",
    });
  }
};
