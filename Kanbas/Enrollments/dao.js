import model from "./model.js";

export function enrollUserInCourse(user, course) {
  return model.create({user, course});
  // const { enrollments } = Database;
  // const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
  // enrollments.push(newEnrollment);
  // return newEnrollment;
}





export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({user, course});
    // const { enrollments } = Database;
    // const targetUser = enrollments.find( (e) => e.user === userId && e.course === courseId );
    // Database.enrollments = enrollments.filter( (enrollment) => ! ( enrollment.user === userId && enrollment.course === courseId) )
    // return targetUser;
  }

export function getEnrollments() {
    return model.find();
  }

// export function findPeopleInCourse(courseId) {
//     const {users, enrollments} = Database;
//     const peopleInCourse = users
//         .filter((usr) =>
//           enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === courseId))
//     return peopleInCourse;
// }
  