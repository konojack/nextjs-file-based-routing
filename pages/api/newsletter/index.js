import Joi from 'joi';
import { MongoClient } from 'mongodb';

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const email = req.body.email;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();
    await db.collection('emails').insertOne({ email: email });

    client.close();

    res.status(201).json({ success: true, email });
  }
};

export default handler;
