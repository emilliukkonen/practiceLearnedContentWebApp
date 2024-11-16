import * as apiService from "../../services/apiService.js";
import * as questionService from "../../services/questionService.js";
import * as quizService from "../../services/quizService.js";


const showQuestion = async ({ response }) => {
 if((await questionService.listAllQuestions()).length === 0) {
    response.body = {};
 } else {
  const question = await apiService.randomQuestion();
  const [q] = question
  const questionId = q.id;
  const questionText = q.question_text;


  const options = await questionService.listOptions(q.id);

  const answerOptions = options.map(option => {
    const { id: optionId, option_text: optionText } = option;
    return { optionId, optionText };
  });

  delete q.user_id
  delete q.topic_id 

  response.body = { questionId, questionText, answerOptions };
 };
  
};

const showAnswer = async ({ response, request }) => {
    const { questionId, optionId } = await request.body().value;

    const opt = await questionService.getOption(optionId)
    
    const correct = opt.is_correct
    

    response.body = { correct };

    //Can be tested with: curl -X POST -H "Content-Type: application/json" -d '{"questionId": (someid), "optionId": (someid)}' http://localhost:7777/api/questions/answer
}

export { showQuestion, showAnswer };