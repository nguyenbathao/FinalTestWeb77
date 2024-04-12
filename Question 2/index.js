import express from "express";
import mongoose from "mongoose";
import  connectDB  from "./db.js"
import jwt from "jsonwebtoken";
import session from "express-session";

const app = express();

connectDB();

app.get('/products', async (req, res) => {
  try {
    const products = await client.db("Product").collection("inventories").find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving products' });
  }
});

app.use(session({
  secret: 'HGFHGEAD1212432432',
  resave: false,
  saveUninitialized: false
}));

app.post('/login', async (req, res) => {
 
  const user = await user.findOne({ username: req.body.username, password: req.body.password });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
 
  const token = jwt.sign({ _id: user._id, username: user.username }, 'HGFHGEAD1212432432');
  
  req.session.jwt = token;

  res.json({ message: 'Login successful', token });
});

app.get('/login', async (req, res) => {
  // Check if the user is logged in
  if (!req.session.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the user's token
  let user;
  try {
    user = jwt.verify(req.session.jwt, 'HGFHGEAD1212432432');
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  const verifiedUser = await user.findOne({ _id: user._id });

  if (!verifiedUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await client.db("Product").collection("users").find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving products' });
  }
});

app.listen(3000, () => {
  console.log("App is running at http://localhost:3000");
});

