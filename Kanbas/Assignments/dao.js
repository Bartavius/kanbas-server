import Database from "../Database/index.js";
import formatDate from "./formatDate.js";

export function getCourseAssignments(courseId) {
    const {assignments} = Database;
    return assignments.filter( (a) => a.course === courseId);
}

export function getAssignmentById(courseId, assignmentId) {
    const {assignments} = Database;
    return assignments.find((a) => a._id === assignmentId && a.course === courseId);
}

export function createAssignment(courseId, assignmentId) {
    const {assignments} = Database;

    const today = new Date(Number(assignmentId));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoDays = new Date(tomorrow);
    twoDays.setDate(twoDays.getDate() + 1);

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);
    const formattedTwoDays = formatDate(twoDays);

    const assignment = {
      _id: assignmentId,
      title: "New Assignment",
      description: "New Assignment",
      points: "100",
      assignment_group: "assignments",
      submission_type: "online",
      display_grade_as: "percentage",
      assign_to: "everyone",
      due_date: formattedTomorrow,
      available_from: formattedToday,
      available_until: formattedTwoDays,
      course: courseId,
    }
    Database.assignments = [...assignments, assignment];
    return assignment;
}

export function updateAssignment(cid, aid, newAssignment) {
    const { assignments } = Database;
    Database.assignments = assignments.map((a) => a._id === aid && a.course ===cid ? newAssignment : a);
    return newAssignment;
}

export function deleteAssignment(cid, aid) {
    const { assignments } = Database;
    Database.assignments = assignments.filter( (a) => !(a.course === cid && a._id === aid));
}