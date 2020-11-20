const bcrypt = require('bcrypt');
const UserModel = require('../users/user.model');
const AppError = require('../errors/appError');
// import { sessionModel } from '../session/session.model';
// const { sessionModel } = require ("./session/session.model");

const { sessionModel } = require('../session/session.model');


const jwt = require('jsonwebtoken');


exports.createNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with such email is exist', 409));
  }

  const passwordHash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS),
  );

  const newUser = await UserModel.create({
    username,
    email,
    passwordHash,
  });

  res.status(201).json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    return next(new AppError('Email is wrong', 404));
  }

  const validPassword = await bcrypt.compare(
    password,
    existingUser.passwordHash,
  );
  if (!validPassword) {
    return next(new AppError('Password is wrong', 403));
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 24 * 60 * 60,
  });
  existingUser.tokens.push(token);
  await existingUser.save();
  res.status(200).json({
    user: {
      username: existingUser.username,
      email: existingUser.email,
      id: existingUser._id,
    },
    token: token,
  });
};

 exports.createSession = async (req, res, next) => {
    try {
      // 1. take user from req.user (passport put it there)
      // 2. create session for authenticated user
      // 3. create token for this session

      // const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      //   expiresIn: 2 * 24 * 60 * 60,
      // });

      const user = req.user;

      console.log(user, '>>>>>>>>>>>>>>>>>>>user');

      const session = await sessionModel.createSession(user._id);
      const sessionToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 2 * 24 * 60 * 60,
        });

      return res.status(201).json({
        token: sessionToken,
      });
    } catch (err) {
      next(err);
    }
  };
