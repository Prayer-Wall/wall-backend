import db from './client.js';
import { createUser } from './queries/users.js';

const seed = async () => {
   for (let i = 1; i <=5; i++) {
      const newUser = {
         name: `Testy${i}`,
         username: `Test${i}`,
         password: `password`
      }
      await createUser(newUser);
   }
}

await db.connect();
await seed();
await db.end();