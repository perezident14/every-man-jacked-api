import WorkoutModel, { Workout } from '../models/workout.model';

export async function listWorkouts() {
  try {
    const workoutList = await WorkoutModel.find();
    return workoutList;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function createWorkout(newWorkout: Workout) {
  try {
    const workout = await WorkoutModel.create(newWorkout);
    return workout;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function readWorkout(id: string) {
  try {
    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      throw new Error('Workout Not Found');
    }
    return workout;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function updateWorkout(id: string, updatedWorkout: Workout) {
  try {
    const workout = await WorkoutModel.findByIdAndUpdate(id, updatedWorkout, { new: true });
    if (!workout) {
      throw new Error('Workout Not Found');
    }
    return workout;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function deleteWorkout(id: string) {
  try {
    const data = await WorkoutModel.deleteOne({ _id: id });
    if (!data.acknowledged) {
      throw new Error('Workout Not Found');
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
