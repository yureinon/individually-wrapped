import db from "../db/connection.js";

export async function login() {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  console.log(results);
  return results;
}
