import mongoose from "mongoose";
// will have to refactor later so that it inherits assignments
const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel"
  },
  QuizType: {
    type: String,
    enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
    default: "GRADED_QUIZ",
  },
  points: Number,
  submission_type: {
    type: String,
    enum: ["ONLINE"],
    default: "ONLINE",
  },
  available_from: Date,
  available_until: Date,
  assign_to: {
    type: String,
    enum: ["EVERYONE"],
    default: "EVERYONE",
  },
  display_grade_as: {
    type: String,
    enum: ["PERCENTAGE"],
    default: "PERCENTAGE",
  },
  assignment_group: {
    type: String,
    enum: ["ASSIGNMENT", "QUIZ", "EXAM", "PROJECT"],
    default: "QUIZ",
  },
  shuffle: {
    type: Boolean,
    default: true
  },
  time_limit: {
    type: Number, // minutes
    default: 20
  },
  multiple_attempts: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 1
  },
  show_correct_answers: {
    type: String,
    enum: ["IMMEDIATELY", "LATER"], // later = date
    default: "IMMEDIATELY"
  },
  access_code: { // if blank, then no input
    type: String,
    default: ""
  },
  one_question_at_a_time: {
    type: Boolean,
    default: true
  },
  webcam_required: {
    type: Boolean,
    default: false
  },
  lock_questions_after_answering: {
    type: Boolean,
    default: false
  },
  due_date: Date,
  available_from: Date,
  available_until: Date,

  questions: [ // TODO
    {
      description: {
        type: String,
        required: true,
      },
      point: Number, // point per question
      questionType: {
        type: String,
        enum: ["TRUE-FALSE", "MC", "FILLBLANK"],
        default: "MC",
      },
      answers: [ // TODO OR TO BE DESIGNED
        {
          type: String
        },
      ],
    },
  ],
}, {collection: "quizzes"});

export default quizSchema
