const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const port = 3000;

const userSchema = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.set("view engine", "ejs");


// Middleware for authentication
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access Denied: Please log in first");
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded; // store user info in req.user
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const creteUser = await userSchema.create({
        username,
        email,
        password: hash,
        age,
      });

      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);

      res.send(creteUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userSchema.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.send("Something went wrong...");

  // console.log(user.password, req.body.password);

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email : user.email }, "secret");
      res.cookie("token", token);
      res.send("Yes You can Log In");


    } else {
      res.send("You can't LogIn");
    }


  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Example app listening on port port`);
});
