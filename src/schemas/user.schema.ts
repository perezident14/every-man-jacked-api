import { any, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required'
    }),
    lastName: string({
      required_error: 'Last name is required'
    }),
    email: string({
      required_error: 'Email is required'
    }).email('Email must be a valid email address'),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    }),
    role: string(),
    workouts: any().array(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
