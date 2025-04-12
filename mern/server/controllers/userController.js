import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  let collection = await db.collection("user");

  const { email, password, name } = req.body;

  const existing = await collection.findOne({ email })
  if (existing) {
    throw new Error("Email already registered")
  }

  const salt = await bcrypt.genSalt(12);
  const pwhash = await bcrypt.hash(password, salt)

  const newUser = await collection.insertOne({email, name, pwhash})
  
}