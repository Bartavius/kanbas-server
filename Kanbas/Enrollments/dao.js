import model from "./model.js";

export function enrollUserInCourse(user, course) {
  return model.create({user, course});
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({user, course});
  }

export function getEnrollments() {
    return model.find();
  }

export async function findPeopleInCourse(courseId) {
  const enrollments = await model.find({course: courseId}).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
  