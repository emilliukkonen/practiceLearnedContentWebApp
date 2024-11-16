import * as statisticsService from "../../services/statisticsService.js";

const findAmounts = async ({ render }) => {
  const count = await statisticsService.findTopicAmount();
  const Qcount = await statisticsService.findQuestionAmount();
  const Acount = await statisticsService.findAnswerAmount();
  render("statistics.eta", { count, Qcount, Acount });
};

export {findAmounts}