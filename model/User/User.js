const mongoose = require("mongoose");
const Post = require("../Post/Post");

// create a schema or a blueprint to create instance of user
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // plan :[
    //   {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    //   }
    // ],
    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Hooks
// pre-before record is saved//find findOne

userSchema.pre("findOne", async function (next) {
  // get the user id
  const userId = this._conditions._id;
  // find the post created by the user
  const posts = await Post.find({ user: userId });
  // get the last post created by the user
  const lastPost = posts[posts.length - 1];

  // get the last post date
  const lastPostDate = new Date(lastPost?.createdAt);
  // get the last post date in string format
  const lastPostDateStr = lastPostDate.toDateString();
  // add virtuals to the schema
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });
  //----------------------------------CHECK IF USER INACTIVE FOR THE LAST 30 DAYS --------------------------------//
  // get current date
  const currentDate = new Date();
  // get the diffence between the last post date and the current data
  const diff = currentDate - lastPostDate;
  // get the difference in days and return less than in days
  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays > 30) {
    // Add virtuals isInactive to the schema to check if a user is inactive for 30 days
    userSchema.virtual("isInactive").get(function () {
      return true;
    });
    // Find the user by ID and update
    await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
    // Find the user by ID and update
    await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  }

  // --------------Last active days-------------

  // convert to days ago, for example 1 days ago
  const daysAgo = Math.floor(diffInDays);
  // add virtuals last active in days to the schema
  userSchema.virtual("lastActive").get(function () {
    // check if days ago less than 0
    if (daysAgo >= 0) {
      return "Today";
    }
    // check if days ago is equal to 1
    if (daysAgo === 1) {
      return "Yesterday";
    }
    // check if days ago is greater than 1
    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    }
  });

  //-------------------------------------------
  // Update userAward based on the number of posts
  //-------------------------------------------
  // get the number of posts
  const numberOfPosts = posts.length;
  //check if the number of posts is less than 10
  if (numberOfPosts < 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      {
        new: true,
      }
    );
  }

  //check if the number of posts is more than 20
  if (numberOfPosts > 20) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      {
        new: true,
      }
    );
  }

  //check if the number of posts is more than 10
  if (numberOfPosts > 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      {
        new: true,
      }
    );
  }

  next();
});

// post -after saving//create
// userSchema.post("save", function (next) {
//   console.log("Post Hook");
// });

// get the fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// get user initials
userSchema.virtual("initials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// get posts count
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

// get followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

// get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

// get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

// get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

// compile the user model
const User = mongoose.model("User", userSchema);
module.exports = User;
