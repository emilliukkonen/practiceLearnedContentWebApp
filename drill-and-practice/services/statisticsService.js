import { sql } from "../database/database.js";

const findTopicAmount = async () => {
    const [row] = await sql`SELECT COUNT(*) as count FROM topics`;
    return row.count;
  };
  

const findQuestionAmount = async () => {
    const [row] = await sql`SELECT COUNT(*) as count FROM questions`;
    return row.count;
  };

const findAnswerAmount = async () => {
    const [row] = await sql`SELECT COUNT(*) as count FROM question_answers`;
    return row.count;
  };
  

  export { findTopicAmount, findQuestionAmount, findAnswerAmount };