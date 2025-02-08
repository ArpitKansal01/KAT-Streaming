const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const LogInCollection = require("./mongo");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const templatePath = path.join(__dirname, "../templates");
app.set("views", templatePath);

const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));
app.get("/signup", (req, res) => {
  res.render("signup"); // Make sure signup.hbs exists
});

app.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user already exists
    const existingUser = await LogInCollection.findOne({ name });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    await LogInCollection.create({ name, password: hashedPassword });

    res.status(201).render("home", { naming: name });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    console.log("Login Attempt:", { name, enteredPassword: password });

    // Find user in database
    const user = await LogInCollection.findOne({ name });

    console.log("Database User:", user);

    if (!user || !user.password) {
      return res.status(400).send("User not found or password missing");
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(201).render("home", { naming: name });
    } else {
      res.send("Incorrect password");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Port connected");
});
app.get("/", (req, res) => {
  res.render("login"); // Make sure login.hbs exists
});
