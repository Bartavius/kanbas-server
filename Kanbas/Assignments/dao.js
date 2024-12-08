import formatDate from "./formatDate.js";
import model from "./model.js";

export function getCourseAssignments(courseId) {
    return model.find({course: courseId});
}

// for testing purposes
export function getAllAssignments() {
    return model.find();
}

export function getAssignmentsByCourseAndGroup(courseId, group) {
    return model.find({course: courseId, assignment_group: group});
}


export function getAssignmentById(assignmentId) { // fix the route for this, initially had two params
    return model.findOne({_id: assignmentId})
}

export async function createAssignment(courseId) { // remove aid -- also change route aid

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoDays = new Date(tomorrow);
    twoDays.setDate(twoDays.getDate() + 1);

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);
    const formattedTwoDays = formatDate(twoDays);

    const assignment = {
      title: `New Assignment${await model.countDocuments({course: courseId})}`,
      description: "New Assignment",
      points: 100,
      assignment_group: "ASSIGNMENT",
      submission_type: "ONLINE",
      display_grade_as: "PERCENTAGE",
      assign_to: "EVERYONE",
      due_date: formattedTomorrow,
      available_from: formattedToday,
      available_until: formattedTwoDays,
      course: courseId,
    }
    return model.create(assignment);
}

export function updateAssignment(aid, newAssignment) { // take cid out from route and client
    return model.updateOne({_id: aid}, {$set: newAssignment})
}

export function deleteAssignment(aid) { // take cid out from route client
    return model.deleteMany({_id: aid})
}