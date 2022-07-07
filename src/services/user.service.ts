import 'dotenv/config';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import UserModel, { User } from '../models/user.model';

export async function createUser(newUser: User) {
  try {
    const hash = await hashPassword(newUser.password);
    const user = await UserModel.create({ ...newUser, password: hash });
    return omit(user, 'password');
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
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error('User Not Found');
  }
  return bcrypt.compare(password, user.password);
};
