const requestHandlers = require("./request_handlers/auth");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;

module.exports = async (app) => {
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

  app.use(passport.initialize());
  app.use(passport.session());

  app.post("/signup");
  app.post("/login");
  app.get(
    "/auth/twitter/callback",
    requestHandlers.twitterAuth,
    requestHandlers.twitterAuthCallback
  );
  app.get("/auth/twitter", requestHandlers.twitterAuth);
};
