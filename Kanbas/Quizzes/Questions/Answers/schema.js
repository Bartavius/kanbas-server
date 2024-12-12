import mongoose from "mongoose";
const answerSchema = new mongoose.Schema(
  {
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizModel"
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionModel"
    },
    answerText: String,
    isCorrect: {
      type: Boolean,
      default: true,
    },
    alternativeAnswers: [String],
  },
  {
    collection: "answers",
  }
);
export default answerSchema;
