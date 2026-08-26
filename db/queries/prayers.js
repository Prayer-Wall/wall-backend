import db from '../client.js';

export const createPrayer = async (userId, prayer) => {
   const sql = `
      INSERT INTO prayers (user_id, prayer)
      VALUES ($1, $2)
      RETURNING id
   `;

   const { rows: [prayerId]} = await db.query(sql, [userId, prayer]);
   return prayerId;
}

export const getWallPrayers = async (userId) => {
   const sql = `
      SELECT prayer FROM prayers
      WHERE prayers.user_id = $1
   `;

   const {rows: prayers} = await db.query(sql, [userId]);
   return prayers;
}