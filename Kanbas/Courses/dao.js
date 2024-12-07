import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import * as Database from "../Database/index.js"; //will remove later once enrollment is implemented

export function findAllCourses() {
  return model.find();
}

export async function findCoursesForUser(userId) {
    const enrollments = await enrollmentModel.find({ user: userId }).populate("course");
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
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}
