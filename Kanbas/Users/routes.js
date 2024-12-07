import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const newUser = await dao.createUser(req.body);
    res.send(newUser); // check this
  };
  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.body._id);
    res.send(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId)
    res.json(user);
  };


  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    const status = await dao.updateUser(userId, userUpdates);
    // const currentUser = await dao.findUserById(userId); // why does the session change here?
    // req.session["currentUser"] = currentUser;
    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = async (req, res) => { 
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(401).json(
        {message: "Incorrect username or password."}
      );
      return;
    }
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // const findCoursesForEnrolledUser = (req, res) => {
  //   let { userId } = req.params;
  //   if (userId === "current") {
  //     const currentUser = req.session["currentUser"];
  //     if (!currentUser) {
  //       res.sendStatus(401);
  //       return;
  //     }
  //     userId = currentUser._id;
  //   }
  //   const courses = courseDao.findCoursesForEnrolledUser(userId);
  //   res.json(courses);
  // };

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };


  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
  // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);

}
