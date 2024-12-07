import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import * as Database from "../Database/index.js"; //will remove later once enrollment is implemented

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
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
