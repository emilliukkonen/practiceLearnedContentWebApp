import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  };
};

const getOptionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: params.get("is_correct"),
  };
};


const addQuestion = async ({ params, request, response, user, render }) => {
  const questionData = await getQuestionData(request);

  const[passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if(!passes){
    console.log(errors);
    questionData.validationErrors = errors;
    

    const topic_id = params.id
    const topic = await topicService.getTopic(topic_id);

    render("topic.eta",  { topic, questionData} );
  } else {
    await questionService.addQuestion(user.id,params.id,questionData.question_text);
    response.redirect(`/topics/${params.id}`);
  };
};

const listQuestions = async ({ params, render }) => {

    const topic_id = params.id
    const topic = await topicService.getTopic(topic_id);
    
    render("topic.eta", { questions: await questionService.listQuestions(topic_id), topic });
};


const addOption = async ({ params, request, response, render }) => {
  const optionData = await getOptionData(request);

  const[passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  const question_id = params.qid
  const topic_id = params.id

  if(!passes){
    console.log(errors);
    optionData.validationErrors = errors;

    const topic = await topicService.getTopic(topic_id);
    const question = await questionService.getQuestion(question_id);

    render("question.eta",  {topic, optionData, question} );
  } else{
    if (optionData.is_correct === "on" ){
      await questionService.addOption(question_id,optionData.option_text,true);
    } else {
        await questionService.addOption(question_id,optionData.option_text,false);
    };
    response.redirect(`/topics/${params.id}/questions/${params.qid}`);
  }

};


const listAnswerOptions = async ({ params, render }) => {

    const topic_id = params.id
    const topic = await topicService.getTopic(topic_id);
    const question_id = params.qid
    const question = await questionService.getQuestion(question_id);
    

    render("question.eta", { options: await questionService.listOptions(question_id), question, topic });
};

const deleteOption = async ({ params, request, response }) => {
    
    const body = request.body({ type: "form" });
    const value = await body.value;
    const option_id = params.oid

    await questionService.deleteAnswer(option_id)
    await questionService.deleteOption(option_id)
    
    

    response.redirect(`/topics/${params.id}/questions/${params.qid}`);
  };

  const deleteQuestion = async ({ params, request, response }) => {
    
    const body = request.body({ type: "form" });
    const value = await body.value;
    const question_id = params.qid

    await questionService.deleteQuestion(question_id)
    

    response.redirect(`/topics/${params.id}`);
  };

export {addQuestion, listQuestions, listAnswerOptions, addOption, deleteOption, deleteQuestion}