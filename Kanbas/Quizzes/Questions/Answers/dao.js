import model from "./model.js";

export function getAnswersFromQuestion(quesId) {
    return model.find({question: quesId})
}

export function getAnswer(qid) {
    return model.find({quiz: qid})
}

export function createAnswer(quizId, quesId) {
    const newAnswer = {
        quiz: quizId,
        question: quesId,
        answerText: "New Answer",
        isCorrect: true,
        alternativeAnswers: []
    }
    return model.create(newAnswer);
}

export function updateAnswer(ansId, newAnswer) {
    return model.updateOne({_id: ansId}, {$set: newAnswer});
}

export function deleteAnswer(ansId) {
    return model.deleteOne({_id: ansId}); 
}
 