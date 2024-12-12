import mongoose from "mongoose";
const quizAttemptsSchema = new mongoose.Schema(
    {
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizModel"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
        responses: [
            {
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "QuestionModel",
                },
                userReponse: {
                    type: String,
                    default: ""
                },
                isCorrect: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    }, {
        timestamps: true,
        collection: "quizAttempts"
      }

)
export default quizAttemptsSchema;