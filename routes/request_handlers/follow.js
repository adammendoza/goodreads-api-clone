const User = require("../../models/User");
const mongoose = require("mongoose");

const handleFollow = async (req, res, next) => {
  const userIdToFollow = req.params.userId;
  const currentUsername = req.username;

  if (userIdToFollow === currentUsername) {
    return res.status(400).send({ error: `Are you kidding?` });
  }

  const userToFollow = await User.findOne(
    {
      $or: [
        { username: userIdToFollow },
        { _id: mongoose.ObjectId(userIdToFollow) },
      ],
    },
    "username followers"
  );

  if (!userToFollow) {
    return res
      .status(404)
      .send({ error: `No user with id ${userIdToFollow}.` });
  }

  const isAlreadyFollowed =
    userToFollow.followers.indexOf(currentUsername) === -1;

  if (isAlreadyFollowed) {
    userToFollow.followers.push(currentUsername);
    await userToFollow.save();

    await User.findOneAndUpdate(
      { username: currentUsername },
      { $push: { following: userToFollow.username } },
      { useFindAndModify: false }
    );
  } else {
    return res.status(400).send({ error: `You already follow.` });
  }

  return res.send({ message: "Success." });
};

const handleUnfollow = async (req, res, next) => {
  const userIdToUnfollow = req.params.userId;
  const currentUsername = req.username;

  if (userIdToUnfollow === currentUsername) {
    return res.status(400).send({ error: `Are you kidding?` });
  }

  try {
    const checkUser = await User.findOneAndUpdate(
      { username: userIdToUnfollow },
      { $pull: { followers: currentUsername } },
      { useFindAndModify: false }
    );

    if (!checkUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const r = await User.findOneAndUpdate(
      { username: currentUsername },
      { $pull: { following: userIdToUnfollow } },
      { useFindAndModify: false }
    );
  } catch (error) {
    res.status(400).send({ error });
  }

  return res.send({ message: "Success." });
};

module.exports = {
  handleFollow,
  handleUnfollow,
};
