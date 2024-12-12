import * as dao from "./dao.js";
import * as attemptDao from "./QuizAttempts/dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes/detail/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.getQuiz(qid);
    res.send(quiz);
  });
  app.get("/api/quizzes/:uid/:qid", async (req, res) => {
    const { uid, qid } = req.params;
    const lastAttempt = await dao.getLastAttempt(uid, qid);
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
