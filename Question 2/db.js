import { MongoClient } from "mongodb";
import mongoose from "mongoose";


const connectDB = async() => {
  try {
    const conn = await mongoose.connect("mongodb+srv://thaobaba8900:2444666666@cluster0.dzrlcus.mongodb.net/")
    console.log(`Connected To Mongo Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error To Connected Database`)
  }
};

export default connectDB

// import { MongoClient } from "mongodb";

// const db = {};

// export const connectDB = () => {
//   const client = new MongoClient("mongodb+srv://thaobaba8900:2444666666@cluster0.dzrlcus.mongodb.net/");
//   client.connect(() => {
//     const database = client.db("Product");
//     db.inventories = database.collection("inventories");
//     db.orders = database.collection("orders");
//     db.users = database.collection("users");
//   });
// };

// module.exports = { connectDB, db };
