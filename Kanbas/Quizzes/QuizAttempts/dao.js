import model from "./model.js";

export function getAttemptsForUser(uid, qid) {
    return model.findOne( {user: uid, quiz: qid} ).sort({ createdAt: -1 }) // descending order (latest first)
}

export function getLastAttempt(uid, qid) {
    return model.findOne( {user: uid, quiz: qid} ).sort({ createdAt: -1 }).limit(1) // descending order (latest first)
}