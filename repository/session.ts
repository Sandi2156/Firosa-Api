import mongodb from "../integrations/mongodb";
import { Types } from "mongoose";

import SessionModel from "../models/session";

async function findSessionEntryForAUser(userId: Types.ObjectId) {
  await mongodb.connect();

  return await SessionModel.find({ userId });
}

async function findUserForASessionId(sessionId: string) {
  await mongodb.connect();

  return await SessionModel.find({ sessionId }).populate("userId");
}

async function createSession(sessionId: string, userId: Types.ObjectId) {
  await mongodb.connect();

  const session = new SessionModel({ sessionId, userId });

  await session.save();
}

async function removeSession(sessionId: string) {
  await mongodb.connect();

  await SessionModel.deleteOne({ sessionId });
}

export default {
  createSession,
  findSessionEntryForAUser,
  findUserForASessionId,
  removeSession,
};
