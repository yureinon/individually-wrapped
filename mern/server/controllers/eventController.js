import db from '../db/connection.js';

const eventCollection = db.collection('event');

export const post = async (req) => {
  const { name, start, end } = req.body;

  const startDate = new Date(start);
  const endDate = new Date(end);

  await eventCollection.insertOne({ name, start: startDate, end: endDate });
};

export const getAll = async (req) => {
  const { day } = req.params;

  const date = new Date(day);
  date.setHours(0, 0, 0, 0);

  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);

  const allEvents = await eventCollection
    .find(
      {
        start: {
          $gte: date,
          $lt: nextDate,
        },
      },
      {
        projection: { _id: 0, name: 1, start: 1, end: 1 },
      }
    )
    .toArray();

  return allEvents;
};
