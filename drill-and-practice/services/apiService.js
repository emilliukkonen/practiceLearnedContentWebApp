import { sql } from "../database/database.js";

const randomQuestion = async () => {
    
    const rows = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
  
    return rows.length > 0 ? rows : null;
};

export {randomQuestion}