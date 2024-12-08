import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments/courses/:cid/group/:gid", async (req, res) => {
    const { cid, gid } = req.params;
    const assignmentByGroup = await dao.getAssignmentsByCourseAndGroup(cid, gid);
    res.send(assignmentByGroup);
  });

  app.post("/api/assignments/courses/:cid", async (req, res) => {
    const { cid } = req.params;
    const assignment = await dao.createAssignment(cid);
    res.send(assignment);
  });
  app.get("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const assignment = await dao.getAssignmentById(aid);
    res.send(assignment);
  });
  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = req.body;
    const assignment = await dao.updateAssignment(aid, updatedAssignment);
    res.send(assignment);
  });
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAssignment(aid);
    res.send(status);
  });
  app.get("/api/assignments/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const allAssignments = await dao.getCourseAssignments(courseId);
    res.send(allAssignments);
  });
  app.get("/api/assignments", async (req, res) => {
    const assignment = await dao.getAllAssignments();
    res.send(assignment);
  });
}
