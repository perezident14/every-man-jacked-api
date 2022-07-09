import 'dotenv/config';
import ExerciseModel, { Exercise } from '../models/exercise.model';

export async function listExercises() {
  try {
    const exerciseList = await ExerciseModel.find();
    return exerciseList;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function createExercise(newExercise: Exercise) {
  try {
    const exercise = await ExerciseModel.create(newExercise);
    return exercise;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function readExercise(id: string) {
  try {
    const exercise = await ExerciseModel.findById(id);
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function updateExercise(id: string, updatedExercise: Exercise) {
  try {
    const exercise = await ExerciseModel.findByIdAndUpdate(id, updatedExercise, { new: true });
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function deleteExercise(id: string) {
  try {
    const exercise = await ExerciseModel.findByIdAndDelete(id, { new: true }); // TODO: Need different return data
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  } catch (error: any) {
    throw new Error(error);
  }
};
