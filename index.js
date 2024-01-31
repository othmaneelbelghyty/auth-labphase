const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./db/UserSchema");

const app = express();
const port = 3005;

const dbConnect = require("./db/dbConnect");
dbConnect();

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation des données d'entrée
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur avec le mot de passe haché
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to register user", error: err.message });
  }
});

// Route de connexion
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log de débogage
    console.log("Attempting login with email:", email);

    const user = await User.findOne({ email });

    if (user) {
      // Log de débogage
      console.log("Found user:", user);

      // Vérification si le mot de passe est correct
      if (await user.comparePassword(password)) {
        res.status(200).json({ message: "Login successful" });
      } else {
        // Log de débogage
        console.log("Incorrect password");
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // Log de débogage
      console.log("User not found");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
