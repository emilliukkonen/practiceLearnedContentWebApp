import { sql } from "../database/database.js";

const addQuestion = async (userId, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topic_id}, ${question_text})`;
  };

const listQuestions = async (topic_id) => {
    
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
  
    return rows;
};

const getQuestion = async (id) => {
    const [question] = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return question;
};

const addOption = async (question_id,option_text,is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text,is_correct) VALUES (${question_id}, ${option_text}, ${is_correct})`;
};

const listOptions = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;

    return rows;
}

const deleteOption = async (option_id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${option_id}`;
};

const deleteQuestion = async (question_id) => {
    await sql`DELETE FROM questions WHERE id = ${question_id}`;
}

const getOption = async (id) => {
    const [question] = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
    return question;
};

const deleteAnswer = async (option_id) => {
    
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${option_id}`;
};


const listAllQuestions = async () => {
    
    const rows = await sql`SELECT * FROM questions`;
  
    return rows;
};

  export { addQuestion, listQuestions, getQuestion, addOption, listOptions, deleteOption, deleteQuestion, getOption, deleteAnswer, listAllQuestions }