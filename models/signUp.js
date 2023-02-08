var mongoose = require("mongoose");
var Schema = mongoose.Schema;

(UserSchema = new Schema({
  email: String,
  password: String,
  passwordConf: String,
  firstName: String,
  lastName: String,
  niche: String,
})),
  (User = mongoose.model("User", UserSchema));

module.exports = User;
