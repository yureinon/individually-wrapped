import db from "../db/connection.js";
import bcrypt from "bcrypt";

export async function login(req) {
  const {email, password} = req.body;
  let collection = db.collection("user");
  let results = await collection.find({email: email}).toArray();
  if (!results[0]) {
    throw new Error("Unauthorized");
  }
  const {pwhash} = results[0];
  bcrypt.compare(password, pwhash, (err, result) => {
    if (!result) {
      throw new Error("Unauthorized");
    }
  });
  return {email: results[0].email, name: results[0].name};
}
