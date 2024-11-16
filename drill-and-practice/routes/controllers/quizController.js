import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

const listTopics = async ({ render, user }) => {
    
    render("quiz.eta", { topics: await topicService.listTopics()});
};

const randomQuestion = async ({ render, response, params }) => {
    const random = await quizService.randomQuestion(params.id);
    if (!random) {
        const check = "true"
        
        render("quiz.eta", { topics: await topicService.listTopics(), check});
    } else {
        const [randomQuestion] = random;
        response.redirect(`/quiz/${params.id}/questions/${randomQuestion.id}`);
    };
}
 
const showQuestion = async ({ params, render }) => {
    const topic_id = params.id
    const topic = await topicService.getTopic(topic_id);
    const question_id = params.qid
    const question = await questionService.getQuestion(question_id);

    render("quizQuestion.eta", { options: await questionService.listOptions(question_id), question, topic });
};

const storeAnswer = async ({ params, render, user, response }) => {
    const option_id = params.oid;
    const option = await questionService.getOption(option_id);
    const question_id = params.qid
    await quizService.storeAnswer(user.id,question_id,option_id);
    if(option.is_correct){
        response.redirect(`/quiz/${params.id}/questions/${params.qid}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/questions/${params.qid}/incorrect`);
    };
};

const correct = async ({ render, params }) => {
    const topic = await topicService.getTopic(params.id);
    render("correct.eta", { topic });
}

const incorrect = async ({ render, params }) => {
    const topic = await topicService.getTopic(params.id);
    const correct = await quizService.findCorrect(params.qid);
    const [correctOption] = correct;
    render("incorrect.eta", { topic, correctOption });
}

export { listTopics, randomQuestion, showQuestion, storeAnswer, correct, incorrect};