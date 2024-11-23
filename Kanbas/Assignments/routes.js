import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments/:courseId/:aid", (req, res) => {
        const { courseId, aid } = req.params;
        const assignment = dao.getAssignmentById(courseId, aid);
        res.send(assignment);
    });
    app.post("/api/assignments/:courseId/:aid", (req, res) => {
        const {courseId, aid} = req.params;
        const assignment = dao.createAssignment(courseId, aid);
        res.send(assignment);
    });
    app.put("/api/assignments/:courseId/:aid", (req, res) => {
        const { courseId, aid } = req.params;
        const updatedAssignment = req.body;
        const assignment = dao.updateAssignment(courseId, aid, updatedAssignment);
        res.send(assignment);
    });
    app.delete("/api/assignments/:courseId/:aid", (req, res) => {
        const { courseId, aid } = req.params;
        const status = dao.deleteAssignment(courseId, aid);
        res.send(status);
    });
    app.get("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        const allAssignments = dao.getCourseAssignments(courseId);
        res.send(allAssignments);
    });
}