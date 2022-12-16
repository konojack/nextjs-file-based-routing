import Joi from 'joi';
import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../../utils/dbUtil';

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
    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      return res.status(500).json({ message: 'Connecting to DB failed!' });
    }

    try {
      await insertDocument(client, 'newsletter', { email: email });
      client.close();
    } catch (err) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }

    res.status(201).json({ success: true, email });
  }
};

export default handler;
