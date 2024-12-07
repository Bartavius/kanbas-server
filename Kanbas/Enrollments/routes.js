import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
          const currentUser = req.session["currentUser"];
          uid = currentUser._id;
        }
        const status = await dao.enrollUserInCourse(uid, cid);
        res.send(status);
      };
      const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
          const currentUser = req.session["currentUser"];
          uid = currentUser._id;
        }
        const status = await dao.unenrollUserFromCourse(uid, cid);
        res.send(status);
      };
     

     
    app.post("/api/enrollments/:cid/:uid", enrollUserInCourse);
    app.delete("/api/enrollments/:cid/:uid", unenrollUserFromCourse);

    app.get("/api/enrollments/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const allPeople = await dao.findPeopleInCourse(courseId);
        return res.send(allPeople);
    });

    app.get("/api/enrollments", async (req, res) => {
        const enrollments = await dao.getEnrollments();
        return res.send(enrollments);
    })
    
}