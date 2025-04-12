import db from "../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req) {
  const {email, password} = req.body;
  let collection = db.collection("user");
  let results = await collection.find({email: email}).toArray();
  if (!results[0]) {
    throw new Error("Unauthorized");
  }
  const {pwhash, id} = results[0];
  bcrypt.compare(password, pwhash, (err, result) => {
    if (!result) {
      throw new Error("Unauthorized");
    }
  });
  const accessToken = jwt.sign({id: id},
    `${process.env.SECRET}`, {
      expiresIn: '30m',
      algorithm: 'HS256'
    }
  );
  return {_id: accessToken, email: results[0].email, name: results[0].name};
}

export async function check(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
