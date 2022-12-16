import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(50).required(),
  text: Joi.string().min(10).max(500).required(),
});

const handler = (req, res) => {
  const { eventId } = req.query;

  if (req.method == 'POST') {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    const data = req.body;
    return res.status(200).json({ eventId, ...data, success: true });
  } else if (req.method == 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Dawid', text: 'A first comment' },
      { id: 'c2', name: 'Natalia', text: 'A second comment' },
    ];

    return res.status(200).json({ comments: dummyList });
  }
};

export default handler;
