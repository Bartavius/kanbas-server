import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

    app.post("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.enrollUserInCourse(userId, courseId);
        return res.send(status);
    });

    app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        return res.send(status);
    })

    app.get("/api/enrollments/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const allPeople = await dao.findPeopleInCourse(courseId);
        return res.send(allPeople);
    });

    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.getEnrollments();
        return res.send(enrollments);
    })
    
}