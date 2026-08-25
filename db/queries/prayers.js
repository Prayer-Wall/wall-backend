import db from '../client.js';

export const createPrayer = async (userID, prayer) => {
   const sql = `
      INSERT INTO prayers (user_id, prayer)
      VALUES ($1, $2)
      RETURNING id
   `;

   const { rows: [prayerId]} = await db.query(sql, [userID, prayer]);
   return prayerId;
}
