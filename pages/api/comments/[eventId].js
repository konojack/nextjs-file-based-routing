import Joi from 'joi';
import { MongoClient } from 'mongodb';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(50).required(),
  text: Joi.string().min(10).max(500).required(),
});

const handler = async (req, res) => {
  const { eventId } = req.query;

  const client = await MongoClient.connect(process.env.MONGODB_URL);

  if (req.method == 'POST') {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(422).send({ message: error.details[0].message });
    }

    const { email, name, text } = req.body;

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    return res
      .status(201)
      .json({ eventId, ...newComment, id: result.insertedId, success: true });
  } else if (req.method == 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
