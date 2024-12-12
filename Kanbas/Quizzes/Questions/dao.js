import model from "./model.js";
import quizModel from "../model.js";

export function getQuestionsForQuiz(qid) {
    return model.find({quiz: qid})
}

export function getQuestion(qid) {
    return model.findOne({_id: qid});
}

export async function addQuestionForQuiz(qid) {
    const newQuestion = { 
      quiz: qid,
      questionText: `New Question ${(await model.find()).length}`,
      point: 1,
      questionType: "MC"
    }
    const newQ = await model.create(newQuestion);
    const quiz = await quizModel.findOne({_id: qid});
    await quizModel.updateOne({_id: qid}, {$set: {points: quiz.points + 1}, $push:{questions: newQ._id}} )
    return newQ;
}
export async function deleteQuestion(quesId) {
    const question = await model.findOne({_id: quesId});
    const quiz = await quizModel.findOne({_id: question.quiz});
    await quizModel.updateOne({_id: question.quiz}, {$set: {points: quiz.points - question.point}, $pull: {questions: quesId}} )
    return model.deleteOne({_id: quesId})
}
export async function updateQuestion(quesId, newQuestion) {
    if (newQuestion.point) {
        const question = await model.findOne({_id: quesId});
        const quiz = await quizModel.findOne({_id: question.quiz});
        await quizModel.updateOne({_id: question.quiz}, {$set: {points: quiz.points + (newQuestion.point - question.point)}} )
    }
    return model.updateOne({_id: quesId}, {$set: newQuestion})
}