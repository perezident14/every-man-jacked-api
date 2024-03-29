import Config from '../config';
import UserModel, { User } from '../models/user.model';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    if (updatedUser.password) {
      const hash = await hashPassword(updatedUser.password);
      updatedUser.password = hash;
    }
    const user = await UserModel.findByIdAndUpdate(id, { ...updatedUser }, { new: true });
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
    const data = await UserModel.deleteOne({ _id: id });
    if (!data.acknowledged) {
      throw new Error('User Not Found');
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function updateUserPassword(id: string, oldPassword: string, newPassword: string) {
  try {
    const isValidPassword = await comparePassword(id, oldPassword);
    if (!isValidPassword) {
      throw new Error('Old Password Invalid');
    }
    return updateUser(id, { password: newPassword } as User);
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(parseInt(Config.SALT_ROUNDS));
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
  const token = jwt.sign(payload, Config.JWT_SECRET, { expiresIn: 3600 });
  const refresh = jwt.sign(payload, Config.JWT_SECRET, { expiresIn: 86400 });

  const AuthenticationResult = {
    AccessToken: token,
    RefreshToken: refresh,
  };

  return { AuthenticationResult, user: payload };
};
