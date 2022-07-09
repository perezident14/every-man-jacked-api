import { Document, model, Schema, Types } from 'mongoose';
import { User } from './user.model';

export interface SessionDocument extends Document {
  user: Types.ObjectId;
  valid: boolean
  userAgent: string
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  valid: {
    type: Boolean,
    default: true,
  },
  userAgent: {
    type: String,
  },
}, {
  timestamps: true,
});

const SessionModel = model('Session', sessionSchema);
export default SessionModel;
