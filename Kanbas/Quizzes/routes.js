import * as dao from "./dao.js";
import * as attemptDao from "./QuizAttempts/dao.js";
import * as questionDao from "./Questions/dao.js";
import * as answerDao from "./Questions/Answers/dao.js";

export default function QuizRoutes(app) {
  app.post("/api/quizzes/:uid/:qid/attempt", async (req, res) => {
    const {uid, qid} = req.params;
    const response = await attemptDao.addResponse(uid, qid);
    res.send(response);
  });
  app.get("/api/quizzes/:uid/:qid/attempt", async (req, res) => {
    const {uid, qid} = req.params;
    const response = await attemptDao.getLastAttempt(uid, qid);
    res.send(response);
  });
  app.put("/api/quizzes/attempt/:attemptId/upgrade", async (req, res) => {
    const {attemptId} = req.params;
    const x = await attemptDao.updateAttempt(attemptId, req.body)
    res.send(x);
  });
  app.post("/api/quizzes/:quizId/question/:quesId/answers", async (req, res) => {
    const { quizId,quesId } = req.params;
    const answers = await answerDao.createAnswer(quizId,quesId);
    console.log(answers);
    res.send(answers);
  });
  app.get("/api/quizzes/question/get/get/:qid", async (req, res) => {
    const { qid } = req.params;
    const answers = await questionDao.getQuestion(qid);
    res.send(answers);
  }); 

  app.get("/api/quizzes/question/:qid/answers", async (req, res) => {
    const { qid } = req.params;
    const answers = await answerDao.getAnswersFromQuestion(qid);
    res.send(answers);
  });
  
  app.delete("/api/quizzes/question/:qid/answers/:ansId", async (req, res) => {
    const { ansId } = req.params;
    const answers = await answerDao.deleteAnswer(ansId);
    res.send(answers);
  });
  app.put("/api/quizzes/answers/update/:ansId", async (req, res) => {
    const { ansId } = req.params;
    const newAns = req.body;
    const answers = await answerDao.updateAnswer(ansId, newAns);
    res.send(answers);
  });
  app.get("/api/quizzes/:qid/answers", async (req, res) => {
    const { qid } = req.params;
    const answers = await answerDao.getAnswer(qid);
    res.send(answers);
  });

  app.get("/api/quizzes/detail/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.getQuiz(qid);
    res.send(quiz);
  });

  app.post("/api/quizzes/question/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await questionDao.addQuestionForQuiz(qid);
    res.send(quiz);
  });
  app.put("/api/quizzes/question/:ques", async (req, res) => {
    const { ques } = req.params;
    const newQuestion = req.body;
    const question = await questionDao.updateQuestion(ques, newQuestion);
    res.send(question);
  });
  app.delete("/api/quizzes/question/:ques", async (req, res) => {
    const { ques } = req.params;
    const question = await questionDao.deleteQuestion(ques);
    res.send(question);
  });
  app.get("/api/quizzes/question/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await questionDao.getQuestionsForQuiz(qid);
    res.send(quiz);
  });

  app.get("/api/quizzes/:uid/:qid", async (req, res) => {
    const { uid, qid } = req.params;
    const lastAttempt = await attemptDao.getLastAttempt(uid, qid);
    res.send(lastAttempt); 
  });
  app.get("/api/quizzes/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.getAllQuizzesFromCourse(courseId);
    res.send(quizzes);
  });
  app.post("/api/quizzes/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.addQuizToCourse(courseId);
    res.send(quizzes);
  });
  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const newUpdate = req.body;
    const quizzes = await dao.updateQuiz(qid, newUpdate);
    res.send(quizzes);
  });
  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizzes = await dao.removeQuiz(qid);
    res.send(quizzes);
  });
  // add CRUD routes for questions here also.
}
