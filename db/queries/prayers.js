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
      SELECT id, prayer FROM prayers
      WHERE prayers.user_id = $1
   `;

   const {rows: prayers} = await db.query(sql, [userId]);
   return prayers;
}

export const editPrayerById = async(id, prayer) => {
   const sql = `
      UPDATE prayers SET prayer = $1 WHERE prayers.id = $2
      RETURNING prayers.prayer
   `;

   const {rows: [newPrayer]} = await db.query(sql, [prayer, id]);
   return newPrayer
}

export const getUserIdByPrayerId = async(id) => {
   const sql = `
      SELECT user_id FROM prayers
      WHERE prayers.id = $1
   `;

   const {rows: [prayer]} = await db.query(sql, [id]);
   return prayer.user_id;
}

export const deletePrayerById = async(id) => {

}