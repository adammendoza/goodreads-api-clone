const requestHandlers = require("../request_handlers/auth");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;

module.exports = async (router) => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URI,
      },
      requestHandlers.handleTwitterUser
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  router.use(passport.initialize());
  router.use(passport.session());

  router.post("/signup");
  router.post("/login");
  router.get(
    "/auth/twitter/callback",
    requestHandlers.twitterAuth,
    requestHandlers.twitterAuthCallback
  );
  router.get("/auth/twitter", requestHandlers.twitterAuth);
};
