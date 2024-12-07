import mongoose from "mongoose";

// lessons will be their own schema in the future, but currently they are hardcoded
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    lessons: [
        {
            _id: String,
            name: String,
            description: String,
            module: String
        }
    ]
  },
  { collection: "modules" }
);
export default schema;
