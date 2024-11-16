import { sql } from "../database/database.js";

const randomQuestion = async (topic_id) => {
    
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM() LIMIT 1`;
  
    return rows.length > 0 ? rows : null;
};

const storeAnswer = async (user_id,question_id,option_id) => {
    await sql`INSERT INTO question_answers (user_id,question_id,question_answer_option_id) VALUES (${user_id}, ${question_id}, ${option_id})`;
}

const findCorrect = async(question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE is_correct = true and question_id = ${question_id}`;

    return rows
}

export {randomQuestion, storeAnswer, findCorrect};