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
  },
  answers: [
    {
      _id: String,
      answerText: String,
      isCorrect: Boolean,
      display: Boolean 
    }
  ]
}, {
  collection: "questions",
});
export default questionSchema;