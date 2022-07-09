import { model, Schema } from 'mongoose';

export enum WorkoutCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  PUSH = 'PUSH',
  PULL = 'PULL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  FULL_BODY = 'FULL_BODY',
  HIIT = 'HIIT',
}

export interface Set {
  reps: number
}

export interface ExerciseItem {
  id: Schema.Types.ObjectId
  sets: Set[]
}

export interface Workout {
  title: string
  category: WorkoutCategory
  exercises: ExerciseItem[]
}

const setSchema = new Schema({
  reps: {
    type: Number,
    required: true,
  },
}, {
  _id: false,
  timestamps: false,
});

const exerciseItemSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  sets: {
    type: [setSchema],
    default: [],
    required: true,
  },
}, {
  _id: false,
  timestamps: false,
});

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: WorkoutCategory,
    required: true,
  },
  exercises: {
    type: [exerciseItemSchema],
    default: [],
    required: true,
  },
}, {
  timestamps: true,
});

const WorkoutModel = model('Workout', workoutSchema);
export default WorkoutModel;
