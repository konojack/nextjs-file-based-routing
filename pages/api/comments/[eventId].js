import Joi from 'joi';
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../utils/dbUtil';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(50).required(),
  text: Joi.string().min(10).max(500).required(),
});

const handler = async (req, res) => {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    return res.status(500).json({ message: 'Connecting to DB failed!' });
  }

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

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      return res.status(201).json({
        eventId,
        ...newComment,
        _id: result.insertedId,
        success: true,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Inserting data failed!' });
    }
  } else if (req.method == 'GET') {
    let documents;
    try {
      documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
    } catch (err) {
      return res.status(500).json({ message: 'Getting comments failed!' });
    }

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
