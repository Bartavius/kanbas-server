import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments/:uid/:cid", (req, res) => {
        const enrollments = dao.getEnrollments();
        return res.send(enrollments);
    })

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
    
    // from dao
    // export async function findCoursesForUser(userId) {
    //     const enrollments = await model.find({ user: userId }).populate("course");
    //     return enrollments.map((enrollment) => enrollment.course);
    //    }
    //    export async function findUsersForCourse(courseId) {
    //     const enrollments = await model.find({ course: courseId }).populate("user");
    //     return enrollments.map((enrollment) => enrollment.user);
    //    }
    //    export function enrollUserInCourse(user, course) {
    //     return model.create({ user, course });
    //    }
    //    export function unenrollUserFromCourse(user, course) {
    //     return model.deleteOne({ user, course });
    //    }
    //    export async function checkUserEnrolledInCourse(userId, courseId) {
    //      const enrollment = await model.find({ user: userId, course: courseId });
    //      return enrollment;
    //    }
}