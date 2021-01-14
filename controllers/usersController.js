const db = require("../models");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Defining methods for the usersController
module.exports = {
  // finds user by unique id and populates page with goals and tasks
  findGoals: (req, res) => {
    db.User.findById(req.user._id)
      .select("goals")
      .populate("goals")
      // .populate("tasks")
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  //adds a new user in the database with hashed password and unique ID
  signup: (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        const response = await newUser.save();
        console.log(response);
        res.send("User Created");
      }
    });
  },

  //used for client side state in order to confirm if a user is logged in or not. req.user is a Passport built-in command
  getUser: (req, res) => {
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },

  //allows a current user (who is already signed up) to login to view
  login: (req, res) => {
    console.log("POST route /login");
    // console.log(req.user);

    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser) {
      console.log(`Deleting ${cleanUser.password}`);
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
    console.log("You are logged in!");
  },

  logout: (req, res) => {
    // req.logOut();
    req.session.destroy((err) => {
      // if (err) {
      // 	return res.redirect('/login');
      // }
      res.redirect("/");
    });
    // res.json({ msg: "Logout Successful" });
  },
};
