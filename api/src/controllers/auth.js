import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';
import errorHandler from '../utils/errorHandler';

const login = async (req, res) => {
  const candidate = await models.User.findOne({
    phone: req.body.phone,
  });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password,
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          phone: candidate.phone,
          userId: candidate._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 30 * 24 * 60 * 60 * 1000 },
      );

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        message: 'Password wrong',
      });
    }
  } else {
    res.status(404).json({
      message: 'Email not found',
    });
  }
};

const register = async (req, res) => {
  const candidate = await models.User.findOne({
    phone: req.body.phone,
  });

  if (candidate) {
    res.status(409).json({
      message: 'This user already exists',
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const user = new models.User({
      phone: req.body.phone,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

export default { login, register };
