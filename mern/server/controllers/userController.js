import db from '../db/connection.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const collection = db.collection('user');

export const signup = async (req) => {
  const { email, password, name } = req.body;

  const existing = await collection.findOne({ email: email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(12);
  const pwhash = await bcrypt.hash(password, salt);

  await collection.insertOne({ email, name, pwhash, status: 'free' });
};

export const get = async (req) => {
  const { email } = req.query;

  const existing = await collection.findOne(
    { email: email },
    { projection: { _id: 0, pwhash: 0 } }
  );
  if (!existing) {
    throw new Error('User not found');
  }

  return existing;
};

export const put = async (req) => {
  const { status } = req.params;
  const { id } = req.user;

  await collection.updateOne({ _id: new ObjectId(id)}, { $set: { status: status } });
};
