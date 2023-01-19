const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { appErr, AppErr } = require("../../utils/appErr");

// register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    // check if user exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exist", 500));
    }
    // hash password (npm i bcryptjs)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    // create an instance of error class and passing it to global object
    next(appErr(error.message));
  }
};

// login
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    // verify password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

// who can view my profile
const whoViewedMyProfile = async (req, res) => {
  try {
    // 1. Find the original
    const user = await User.findById(req.params.id);
    // 2. Find the user who viewed the original user
    const userWhoViewed = await User.findById(req.userAuth);
    // 3. Check if original and who views are found
    if (user && userWhoViewed) {
      // 4. Check if userWhoViewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlreadyViewed) {
        return next(appErr("You already viewed this profile"));
      } else {
        // 5. Push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);
        // 6. Save the user
        await user.save();
        res.json({
          status: "success",
          data: "You have succesfully viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

// following
const followingCtrl = async (req, res, next) => {
  try {
    // 1. find user to follow
    const userToFollow = await User.findById(req.params.id);
    // 2. find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);
    // 3. check if user and userWhoFollowerd are found
    if (userToFollow && userWhoFollowed) {
      // 4. check if userWhoFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("You already followed this user"));
      } else {
        // 5. push userWhoFollowed into the user's followers array
        userToFollow.followers.push(userWhoFollowed._id);
        // push userToFollow to the userWhoFollowed's following array
        userWhoFollowed.following.push(userToFollow._id);

        // save
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have succesfully followed this user",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

// unfollow
const unfollowCtrl = async (req, res) => {
  try {
    // 1. find the user to unfollow
    const userToBeUnfollowed = await User.findById(req.params.id);
    // 2. find the user who is unfollowing
    const userWhoUnFollowed = await User.findById(req.userAuth);
    // 3. check if user and userWhoUnFollowed are found
    if (userToBeUnfollowed && userWhoUnFollowed) {
      // 4. check if userWhoUnFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appErr("You have not followed this user"));
      } else {
        // 5. remove userWhoUnFollowed from the user's followers array
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollowed._id.toString
        );
        // 6. save the user
        await userToBeUnfollowed.save();
        // 7. Remove userToBeUnFollowed from the userWhoUnfollowed's following array
        userWhoUnFollowed.following = userWhoUnFollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );
        // 8. save the user
        await userWhoUnFollowed.save();
        res.json({
          status: "success",
          data: "unfollow",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

// all
const usersCtrl = async (req, res) => {
  const users = await User.find();
  try {
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// block
const blockUsersCtrl = async (req, res) => {
  try {
    // 1. Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    // 2. Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);
    // 3. Check if userToBeBlocked and userWhoBlocked are found
    if (userToBeBlocked && userWhoBlocked) {
      // 4. Check if userWhoBlocked is alredy in the user's blocked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      }
      // 7. Push userToBeBlocked to the userWhoBlocked's blocked arr
      userWhoBlocked.blocked.push(userToBeBlocked._id);
      // 8. save
      await userWhoBlocked.save();
      res.json({
        status: "success",
        data: "Blocked",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

// unblock
const unblockUsersCtrl = async (req, res) => {
  try {
    // 1. Find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);
    // 2. Find the user who is unblocking
    const userWhoUnBlocked = await User.findById(req.userAuth);
    // 3. Check if userToBeUnBlocked and userWhoUnBlocked are found
    if (userToBeUnBlocked && userWhoUnBlocked) {
      // 4. Check if userToBeUnBlocked is already in the array's of userWhoUnbBlocked
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("You have blocked this user"));
      }
      // Remove the userToBeUnblocked from the main user
      userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
        (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
      );
    }
    // Save
    await userWhoUnBlocked.save();

    res.json({
      status: "success",
      data: "unblock user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// admin-block
const adminUserBlockCtrl = async (req, res) => {
  try {
    // 1. find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    // 2. Check if user found
    if (!userToBeBlocked){
      return next(appErr("User not Found"));
    }
    // 3. Change the isBlocked to true
    userToBeBlocked.isBlocked =  true;
    // 4. Save
    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: "Block by admin",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// admin-unblock
const adminUserunblockCtrl = async (req, res) => {
  try {
    // 1. find the user to be unblocked
    const userToBeunblocked = await User.findById(req.params.id);
    // 2. Check if user found
    if (!userToBeunblocked){
      return next(appErr("User not Found"));
    }
    // 3. Change the isBlocked to true
    userToBeunblocked.isBlocked =  false;
    // 4. Save
    await userToBeunblocked.save();
    res.json({
      status: "success",
      data: "You have succesfully unblocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// profile
const userProfileCtrl = async (req, res) => {
  // get user ID from userAuth, no need req.params anymore
  // console.log(req.userAuth);
  // const { id } = req.params;
  try {
    // get token from the header
    const token = getTokenFromHeader(req);
    console.log(token);
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update
const updateCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete
const deleteCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// profile photo upload
const profilePhotoUploadCtrl = async (req, res, next) => {
  try {
    // 1. find the user to be updated
    const userToUpdate = await User.findById(req.userAuth);
    // 2. check if user is found
    if (!userToUpdate) {
      return next(appErr("User Not Found", 403));
    }
    // 3. check if user is blocked
    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowed, your account is blocked", 400));
    }
    // 4. check if user updating their photo
    if (req.file) {
      // 5. update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: "You have succesfully updated your photo",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  updateCtrl,
  deleteCtrl,
  profilePhotoUploadCtrl,
  whoViewedMyProfile,
  followingCtrl,
  unfollowCtrl,
  blockUsersCtrl,
  unblockUsersCtrl,
  adminUserBlockCtrl,
  adminUserunblockCtrl
};
