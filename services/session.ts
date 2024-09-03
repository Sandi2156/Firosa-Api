import { v4 as uuidv4 } from "uuid";

import sessionRepository from "../repository/session";
import { Types } from "mongoose";

async function createSession(userId: Types.ObjectId) {
  const sessionId = uuidv4();

  const existingSession = await sessionRepository.findSessionEntryForAUser(
    userId
  );

  if (existingSession && existingSession.length > 0)
    return existingSession[0].sessionId;

  await sessionRepository.createSession(sessionId, userId);

  return sessionId;
}

async function findUserForASessionId(sessionId: string) {
  return await sessionRepository.findUserForASessionId(sessionId);
}

async function removeSession(sessionId: string) {
  await sessionRepository.removeSession(sessionId);
}

export default {
  createSession,
  findUserForASessionId,
  removeSession,
};
