import model from "./model.js";

export function getAllQuizzesFromCourse(cid) {
    return model.find( {course: cid} )
}