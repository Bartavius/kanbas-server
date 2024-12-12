import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizModel",
  },
  questionText: {
    type: String,
    required: true,
  },
  point: Number, // point per question
  questionType: {
    type: String,
    enum: ["TRUE-FALSE", "MC", "FILLBLANK"],
    default: "MC",
  }
}, {
  collection: "questions",
});
export default questionSchema;