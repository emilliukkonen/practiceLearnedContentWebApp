import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics",topicController.listTopics);
router.post("/topics", topicController.addTopic);

router.get("/topics/:id",questionController.listQuestions);
router.post("/topics/:id",questionController.addQuestion);

router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qid", questionController.listAnswerOptions);

router.post("/topics/:id/questions/:qid/delete", questionController.deleteQuestion);

router.post("/topics/:id/questions/:qid/options", questionController.addOption);
router.post("/topics/:id/questions/:qid/options/:oid/delete", questionController.deleteOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:id", quizController.randomQuestion);
router.get("/quiz/:id/questions/:qid",quizController.showQuestion); 
router.post("/quiz/:id/questions/:qid/options/:oid",quizController.storeAnswer);

router.get("/quiz/:id/questions/:qid/correct",quizController.correct);
router.get("/quiz/:id/questions/:qid/incorrect",quizController.incorrect);

router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/statistics",statisticsController.findAmounts)

router.get("/api/questions/random",questionApi.showQuestion);
router.post("/api/questions/answer",questionApi.showAnswer);

export { router };
