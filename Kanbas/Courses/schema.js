import mongoose from "mongoose";
// start/end date are strings for now but will eventually be stored as Date
// author will eventuall be user objectID when newer functions are implemented
const courseSchema = new mongoose.Schema(
 {
   name: String,
   number: String,
   startDate: String,
   endDate: String,
   department: String,
   credits: Number,
   description: String,
   image: {
    type: String,
    default: "reactjs.jpg"
   },
   author: String,
 },
 { collection: "courses" }
);
export default courseSchema;