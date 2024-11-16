import { renderFile } from "../../deps.js";
import * as topicService from "../../services/topicService.js";
import * as userService from "../../services/userService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};


const addTopic = async ({ request, response, user, render }) => {
  const topicData = await getTopicData(request);
    
    
  const[passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if(!passes){
    console.log(errors);
    topicData.validationErrors = errors;

    render("topicsAdmin.eta",  topicData );
  } else {
    await topicService.addTopic(user.id, topicData.name);
    response.redirect("/topics");
  };
  
};

const listTopics = async ({ render, user }) => {
    const currentUser = await userService.getUser(user.id);
    
    if (currentUser.admin){
      render("topicsAdmin.eta", { topics: await topicService.listTopics(), currentUser });
    } else {
      render("topics.eta", { topics: await topicService.listTopics(), currentUser });
    };
};

const deleteTopic = async ({ params, request, response, user }) => {

     if (user.admin) {
      const body = request.body({ type: "form" });
      const value = await body.value;
      const topic_id = params.id

      const q = await questionService.listQuestions(topic_id)
      
      if(q.length !== 0){
          for (let i = 0; i<q.length; i++){
              
              let question_id = q[i].id
              const options = await questionService.listOptions(question_id);
              
              for (let j = 0; j<options.length; j++){
                  let option_id = options[j].id
                  await questionService.deleteAnswer(option_id);
                  await questionService.deleteOption(option_id);
              }
              
              
          }
          
          await topicService.deleteQuestions(topic_id);
      }
      await topicService.deleteTopic(topic_id);
      
      response.redirect(`/topics`);
    } else {
      response.redirect(`/topics`);
    };
    
  };


export { addTopic, listTopics, deleteTopic };