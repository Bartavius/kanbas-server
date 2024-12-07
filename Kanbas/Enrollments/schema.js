import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
 {
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
   user:   { type: mongoose.Schema.Types.ObjectId, ref: "UserModel"   },
 },
 { collection: "enrollments" }
);
export default enrollmentSchema;