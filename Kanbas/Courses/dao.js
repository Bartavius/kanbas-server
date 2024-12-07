import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export function findAllCourses() {
  return model.find();
}

export async function findCoursesForUser(userId) {
  const enrollments = await enrollmentModel
    .find({ user: userId })
    .populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export function createCourse(course) {
  delete course._id;
  return model.create(course);
}

export async function deleteCourse(courseId) {
  await model.deleteOne({ _id: courseId });
  await enrollmentModel.deleteMany({ course: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
