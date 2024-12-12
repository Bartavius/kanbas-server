import model from "./model.js";

export function getAllQuizzesFromCourse(cid) {
    return model.find( {course: cid} )
}

export async function addQuizToCourse(cid) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoDays = new Date(tomorrow);
    twoDays.setDate(twoDays.getDate() + 1);
    const newQuiz = {
        title: `New Quiz ${await model.countDocuments({course: cid})}`,
        description: "New Quiz Description",
        course: cid,
        quizType: "GRADED_QUIZ",
        points: 0, // the sum of the points of all questions in the quiz, defaults to 0 as there's no questions
        submission_type: "ONLINE",
        available_from: today,
        available_until: twoDays,
        due_date: tomorrow,
        assign_to: "EVERYONE",
        display_grade_as: "PERCENTAGE",
        assignment_group: "QUIZ",
        shuffle: true,
        time_limit: 20, // minutes
        multiple_attempts: false,
        attempts: 1,
        show_correct_answers: "IMMEDIATELY",
        access_code: "",
        one_question_at_a_time: true,
        webcam_required: false,
        lock_questions_after_answering: false,
        questions: [] // start with no questions
    };
    return model.create(newQuiz);

}
export function removeQuiz(qid) {
    return model.deleteOne( {_id: qid } );
}
export function updateQuiz(qid, newQuiz) {
    return model.updateOne( {_id: qid }, {$set: newQuiz});
}
export function getQuiz(qid) {
    return model.findOne( {_id: qid } );
}