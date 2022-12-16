import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const handler = (req, res) => {
  if (req.method == 'POST') {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const email = req.body.email;
    res.status(201).json({ success: true, email });
  }
};

export default handler;
