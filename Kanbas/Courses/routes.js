import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });

//   const findAllCourses = (req, res) => {
    
//     const courses = courseDao.findAllCourses();

//     res.json(courses);
//   }
  //app.get("/api/users/courses", findAllCourses);

}
