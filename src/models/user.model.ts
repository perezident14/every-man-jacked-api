import { model, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  workouts: Schema.Types.ObjectId[]
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
    required: true,
  },
  workouts: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: true,
  },
}, { timestamps: true });

const UserModel = model('User', userSchema);
export default UserModel;
