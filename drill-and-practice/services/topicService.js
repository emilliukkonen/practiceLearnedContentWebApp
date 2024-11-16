import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name`;
  
    return rows;
  };

const getTopic = async (id) => {
  const [topic] = await sql`SELECT * FROM topics WHERE id = ${id}`;
  return topic;
};

const deleteTopic = async (topic_id) => {
    await sql`DELETE FROM topics WHERE id = ${topic_id}`;
}

const deleteQuestions = async (topic_id) => {
    await sql`DELETE FROM questions WHERE topic_id = ${topic_id}`;
}


export { addTopic, listTopics, getTopic, deleteTopic, deleteQuestions };