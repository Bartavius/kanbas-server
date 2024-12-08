import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.get("/api/quizzes/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.getAllQuizzesFromCourse(courseId);
        res.send(quizzes);
      }
    )
}