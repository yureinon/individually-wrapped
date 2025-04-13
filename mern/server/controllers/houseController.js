import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const userCollection = db.collection('user');
const houseCollection = db.collection('house');

export const post = async (req) => {
  const { id } = req.user;
  const { type, name } = req.body;

  // find email of user
  const email = await userCollection.findOne(
    { _id: new ObjectId(id) },
    { projection: { _id: 0, name: 0, pwhash: 0 } }
  );

  // check if user in house
  const inHouse = await houseCollection.findOne({ members: email });
  if (inHouse) {
    throw new Error('Already in a house');
  }

  const house = await houseCollection.insertOne({
    name,
    type,
    members: [email.email],
  });
  return { id: house.insertedId };
};

export const get = async (req) => {
  const { id } = req.user;

  // find email of user
  const email = await userCollection.findOne(
    { _id: new ObjectId(id) },
    { projection: { _id: 0, name: 0, pwhash: 0 } }
  );

  // check if user in house
  const house = await houseCollection.findOne({ members: email.email });
  if (!house) {
    throw new Error('Not in a house');
  }
  return house;
};
