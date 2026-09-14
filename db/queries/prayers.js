import db from "../client.js";

export const createPrayer = async (userId, imagePath, prayer) => {
  const sql = `
      INSERT INTO prayers (user_id, image, prayer)
      VALUES ($1, $2, $3)
      RETURNING id
   `;

  const {
    rows: [prayerId],
  } = await db.query(sql, [userId, imagePath, prayer]);
  return prayerId;
};

export const getWallPrayers = async (userId) => {
  const sql = `
      SELECT id, image, prayer FROM prayers
      WHERE prayers.user_id = $1
      ORDER BY id
   `;

  const { rows: prayers } = await db.query(sql, [userId]);
  return prayers;
};

export const getPrayerById = async (id) => {
  const sql = `
      SELECT prayer FROM prayers
      WHERE prayers.id = $1
   `;

  const {
    rows: [prayer],
  } = await db.query(sql, [id]);
  return prayer;
};

export const editPrayerById = async (id, imagePath, prayer) => {
  const sql = `
      UPDATE prayers SET prayer = $1, image = $2 
      WHERE prayers.id = $3
      RETURNING prayers.prayer
   `;

  const {
    rows: [newPrayer],
  } = await db.query(sql, [prayer, imagePath, id]);
  return newPrayer;
};

export const getUserIdByPrayerId = async (id) => {
  const sql = `
      SELECT user_id FROM prayers
      WHERE prayers.id = $1
   `;

  const {
    rows: [prayer],
  } = await db.query(sql, [id]);
  return prayer.user_id;
};

export const deletePrayerById = async (id) => {
  const sql = `
      DELETE FROM prayers
      WHERE prayers.id = $1
      RETURNING prayers.prayer
   `;

  const {
    rows: [prayer],
  } = await db.query(sql, [id]);
  return prayer.prayer;
};
