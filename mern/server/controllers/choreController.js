import { ObjectId } from "mongodb";
import db from "../db/connection.js";

export async function post(id, body) {
  const userCollection = db.collection("user");
  const houseCollection = db.collection("house");
  const choreCollection = db.collection("chore");

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get house of logged in user
  const house = await houseCollection.findOne({ members: loggedEmail });
  if (!house) {
    throw new Error("House does not exist for user");
  }

  // loop
  for (const chore of body) {
    // check if chore.email exists in house
    const existing = await houseCollection.findOne({
      _id: new ObjectId(house._id),
      members: chore.email,
    });
    if (!existing) {
      throw new Error("User does not exist in house");
    }

    // insert new chore: name, email, house, completed
    await choreCollection.insertOne({
      name: chore.name,
      email: chore.email,
      house: house._id.toString(),
      completed: false,
    });
  }
}

export async function put(id) {
  const userCollection = db.collection("user");
  const houseCollection = db.collection("house");
  const choreCollection = db.collection("chore");

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get house member list
  const house = await houseCollection.findOne({ members: loggedEmail });
  if (!house) {
    throw new Error("House does not exist for user");
  }

  // get all chores
  const chores = await choreCollection.find({}).toArray();

  // for each chore, increment the user
  for (const chore of chores) {
    // find index of chore.email in members
    const index = house.members.findIndex((user) => user == chore.email);
    const newEmail =
      index + 1 == house.members.length
        ? house.members[0]
        : house.members[index + 1];
    await choreCollection.updateOne(
      { _id: chore._id },
      { $set: { email: newEmail } }
    );
  }
}

export async function toggleCompleted(id, name) {
  const userCollection = db.collection("user");
  const choreCollection = db.collection("chore");

  // get completed
  const chore = await choreCollection.findOne({ name: name });

  // check that logged in user has that chore
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });
  if (loggedEmail != chore.email) {
    throw new Error("Can not toggle other user's chore");
  }

  await choreCollection.updateOne(
    { name: name },
    { $set: { completed: !chore.completed } }
  );
}

export async function get(id, email) {
  const userCollection = db.collection("user");
  const houseCollection = db.collection("house");
  const choreCollection = db.collection("chore");

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get house member list
  const house = await houseCollection.findOne({ members: {$all: [email, loggedEmail]} });
  if (!house) {
    throw new Error("House does not exist for user");
  }

  const chores = await choreCollection
    .find({ house: house._id.toString(), email: email }, { projection: {_id: 0, name: 1, completed: 1} })
    .toArray();
  return chores;
}
