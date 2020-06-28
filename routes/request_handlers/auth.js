const passport = require("passport");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const twitterAuth = passport.authenticate("twitter", {
  failureRedirect: "/login",
});

const twitterAuthCallback = (req, res, next) => {
  const username = req.session.passport.user.username;
  const token = jwt.sign(username, process.env.JWT_SECRET);
  return res.send({ token });
};

const handleTwitterUser = async (token, tokenSecret, profile, cb) => {
  const {
    name,
    screen_name: username,
    profile_image_url: avatar,
    description,
  } = profile._json;

  const res = await User.findOne({ username });
  let user;
  if (res) {
    user = res;
  } else {
    const newUser = new User({
      username,
      description,
      name,
      avatar,
    });

    user = await newUser.save();
  }

  return cb(null, user);
};

module.exports = {
  twitterAuth,
  twitterAuthCallback,
  handleTwitterUser,
};
