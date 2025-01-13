import model from "./model.js";
import questionModel from "../Questions/model.js";

export async function addResponse(uid, qid) {
  const quiz = await questionModel.find({ quiz: qid });
  const questionList = quiz.map((q) => ({ question: q._id }));
  // gonna have to remove the last attempt before creating a new one
  const attempt = {
    quiz: qid,
    user: uid,
    responses: questionList,
  };
  return model.create(attempt);
}

export function getAttemptsForUser(uid, qid) {
  return model.find({ user: uid, quiz: qid }).sort({ createdAt: -1 }); // descending order (latest first)
}

export function getLastAttempt(uid, qid) {
  return model.find({ user: uid, quiz: qid }).sort({ createdAt: -1 }).limit(1); // descending order (latest first)
}

export function updateAttempt(attemptId, newUp) {
  return model.updateOne({ _id: attemptId }, { $set: newUp });
}

export async function updateQuestionResponse(questionId, attemptId, newUpdate) {
  const attempt = await model.findById(attemptId);
  console.log(`update Body:${JSON.stringify(newUpdate)}`);
  console.log(`questionId:${questionId}`);
  console.log(`attemptId:${attemptId}`);
  const revamped = attempt.responses.map((questionResponse) => {
    console.log(questionResponse.question);
    if (questionResponse.question.toString() === questionId) {
        return { question: questionResponse.question, userResponse: newUpdate.userResponse, isCorrect: newUpdate.isCorrect, _id: questionResponse._id};
    } else {
        return questionResponse
    }
  });
  console.log(revamped);
  return model.updateOne({ _id: attemptId }, { $set: { responses: revamped } });
}
