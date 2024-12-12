import model from "./model.js";
import questionModel from "../Questions/model.js";

export async function addResponse(uid, qid) {
    const quiz = await questionModel.find({quiz: qid});
    const filteredQuiz = quiz.map((q) => ({question: q._id}));
    const attempt = {
        quiz: qid,
        user: uid,
        responses: filteredQuiz
    }
    return model.create(attempt);
}

export function getAttemptsForUser(uid, qid) {
    return model.find( {user: uid, quiz: qid} ).sort({ createdAt: -1 }) // descending order (latest first)
} 

export function getLastAttempt(uid, qid) {
    return model.find( {user: uid, quiz: qid} ).sort({ createdAt: -1 }).limit(1) // descending order (latest first)
} 

export function updateAttempt(attemptId, newUp) {
    return model.updateOne({_id: attemptId}, {$set: newUp});
}