import mongoose from "mongoose";
// available from/until/due date will be date and time later
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Assignment",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
    },
    description: String,
    points: {
      type: Number,
      default: 100,
    },
    submission_type: {
        type: String,
        enum: ["ONLINE"],
        default: "ONLINE",
    },
    available_from: String,
    available_until: String,
    display_grade_as: {
      type: String,
      enum: ["PERCENTAGE"],
      default: "PERCENTAGE",
    },
    assignment_group: {
      type: String,
      enum: ["ASSIGNMENT", "QUIZ", "EXAM", "PROJECT"],
      default: "ASSIGNMENT",
    },
    assign_to: {
      type: String,
      enum: ["EVERYONE"],
      default: "EVERYONE",
    },
    due_date: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
