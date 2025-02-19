import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await modulesDao.findModulesForCourse(cid);
    res.json(modules);
  });
  app.get("/api/courses/:cid/people", async (req, res) => {
    const { cid } = req.params;
    const modules = await enrollmentsDao.findPeopleInCourse(cid);
    res.json(modules);
  });
  app.delete("/api/courses/:cid", async (req, res) => {
    const { cid } = req.params;
    const status = await dao.deleteCourse(cid);
    res.send(status);
  });
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    if (!status) {
      res
        .status(400)
        .json({ message: "Please select a course to edit first." });
      return;
    }
    res.send(status);
  });
  app.get("/api/courses/:uid", async (req, res) => {
    const { uid } = req.params;
    const courses = await dao.findCoursesForUser(uid);
    res.send(courses);
  });
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
}
