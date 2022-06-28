import SessionModel from '../models/session.model';

export async function createSession(id: string, userAgent: string) {
  const session = await SessionModel.create({ user: id, userAgent });
  return session.toJSON();
};
