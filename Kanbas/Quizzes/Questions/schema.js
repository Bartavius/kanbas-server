import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel",
  },
  question: {
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
  },
  answers: [
    {
      answerText: String,
      isCorrect: Boolean
    }
  ],
  alternativeAnswers: [String]
}, {
  collection: "questions",
});
export default questionSchema;