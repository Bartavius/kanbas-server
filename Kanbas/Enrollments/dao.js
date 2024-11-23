import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
}
export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter( (enrollment) => ! ( enrollment.user === userId && enrollment.course === courseId) )
  }

export function getEnrollments() {
    const { enrollments } = Database;
    return enrollments;
  }

export function findPeopleInCourse(courseId) {
    const {users, enrollments} = Database;
    const peopleInCourse = users
        .filter((usr) =>
          enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === courseId))
    return peopleInCourse;
}
  