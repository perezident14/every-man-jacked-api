import 'dotenv/config';
import bcrypt from 'bcrypt';
import { CallbackWithoutResultAndOptionalError, Document, model, Schema, Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  workouts: Schema.Types.ObjectId[]
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>
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
    required: true,
  },
  workouts: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = model('User', userSchema);
export default UserModel;
