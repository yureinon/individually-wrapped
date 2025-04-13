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
  const {pwhash, _id} = results[0];
  bcrypt.compare(password, pwhash, (err, result) => {
    if (!result) {
      throw new Error("Unauthorized");
    }
  });
  const accessToken = jwt.sign({id: _id},
    `${process.env.SECRET}wrapped`, {
      expiresIn: '30m',
      algorithm: 'HS256'
    }
  );
  return {accessToken: accessToken, email: results[0].email, name: results[0].name};
}

export async function check(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, `${process.env.SECRET}wrapped`, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.sendStatus(403);
  }
}
