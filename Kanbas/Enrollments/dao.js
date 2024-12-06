import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
export async function checkUserEnrolledInCourse(userId, courseId) {
  const enrollment = await model.find({ user: userId, course: courseId });
  return enrollment;
}


// import Database from "../Database/index.js";

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
//   enrollments.push(newEnrollment);
//   return newEnrollment;
// }
// export function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = Database;
//     const targetUser = enrollments.find( (e) => e.user === userId && e.course === courseId );
//     Database.enrollments = enrollments.filter( (enrollment) => ! ( enrollment.user === userId && enrollment.course === courseId) )
//     return targetUser;
//   }

// export function getEnrollments() {
//     const { enrollments } = Database;
//     return enrollments;
//   }

// export function findPeopleInCourse(courseId) {
//     const { users, enrollments } = Database;
//     const peopleInCourse = users
//         .filter((usr) =>
//           enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === courseId))
//     return peopleInCourse;
// }
  