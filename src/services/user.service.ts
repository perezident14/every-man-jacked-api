import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/user.model';

export async function listUsers() {
  try {
    const userList = await UserModel.find({}, '-password');
    return userList;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function createUser(newUser: User) {
  try {
    const hash = await hashPassword(newUser.password);
    const user = await UserModel.create({ ...newUser, password: hash });
    return user.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function readUser(id: string) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    return user.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function updateUser(id: string, updatedUser: User) {
  try {
    const hash = await hashPassword(updatedUser.password);
    const user = await UserModel.findByIdAndUpdate(id, { ...updatedUser, password: hash }, { new: true });
    if (!user) {
      throw new Error('User Not Found');
    }
    return user.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function deleteUser(id: string) {
  try {
    const user = await UserModel.findByIdAndDelete(id, { new: true }); // TODO: Need different return data
    if (!user) {
      throw new Error('User Not Found');
    }
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export async function comparePassword(id: string, password: string) {
  const user = await UserModel.findById(id, 'password');
  if (!user) {
    throw new Error('User Not Found');
  }
  return bcrypt.compare(password, user.password)
};

export async function loginUser(email: string, password: string) {
  const [user] = await UserModel.find({ email });
  if (!user) {
    throw new Error('User Not Found');
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new Error('Invalid Password');
  }

  const payload = user.toJSON();
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
  const refresh = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });

  const AuthenticationResult = {
    AccessToken: token,
    RefreshToken: refresh,
  };

  return { AuthenticationResult, user: payload };
};
