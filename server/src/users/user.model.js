const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const userSchema = new Schema(
  {
    First_Name: { type: String, require: true },
    Last_Name: { type: String, require: true },
    Email: { type: String, require: true, unique: true },
    Phone: { type: Number, require: true },
    Image_Name: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

/**Assign Schema and set a collection name for mongo */
const Users = mongooes.model("users", userSchema);
module.exports = Users;
