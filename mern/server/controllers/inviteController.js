import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

export async function post(id, email) {
  const userCollection = db.collection('user');
  const houseCollection = db.collection('house');
  const inviteCollection = db.collection('invite');

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get house of logged in user
  const house = await houseCollection.findOne({ members: loggedEmail });
  if (!house) {
    throw new Error('House does not exist for user');
  }

  // check if invite already exists
  const invite = await inviteCollection.findOne({
    email: email,
    house: { id: house._id.toString(), name: house.name },
  });
  if (invite) {
    throw new Error('Invite already exists');
  }

  // insert house name, email, accepted = false
  await inviteCollection.insertOne({
    email: email,
    house: { id: house._id.toString(), name: house.name },
    accepted: false,
  });
}

export async function put(id, inviteId) {
  const userCollection = db.collection("user");
  const houseCollection = db.collection("house");
  const inviteCollection = db.collection("invite");

  // update accepted to true
  const invite = await inviteCollection.findOneAndUpdate(
    { _id: new ObjectId(inviteId), accepted: false },
    { $set: { accepted: true } },
    { new: true }
  );
  if (!invite) {
    throw new Error("Invite does not exist");
  }

  // add to members list
  await houseCollection.updateOne(
    { _id: new ObjectId(invite.house.id) },
    { $push: { members: invite.email } }
  );
}

export async function getInbound(id) {
  const userCollection = db.collection('user');
  const inviteCollection = db.collection('invite');

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get invites
  const invite = await inviteCollection
    .aggregate([
      { $match: { email: loggedEmail, accepted: false } },
      { $project: { id: '$_id', _id: 0, house: 1 } },
    ])
    .toArray();

  // return invite id and house
  return invite;
}

export async function getOutbound(id) {
  const userCollection = db.collection('user');
  const houseCollection = db.collection('house');
  const inviteCollection = db.collection('invite');

  // get email of logged in user
  const { email: loggedEmail } = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  // get house of logged in user
  const house = await houseCollection.findOne(
    { members: loggedEmail },
    { _id: 1, name: 1 }
  );

  // get outbound invites of house
  const invite = await inviteCollection
    .aggregate([
      { $match: { 'house.id': house._id.toString() } },
      {
        $project: {
          id: '$_id',
          _id: 0,
          accepted: 1,
          email: 1,
        },
      },
    ])
    .toArray();

  // return invite id and house
  return invite;
}
