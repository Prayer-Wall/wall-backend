import db from './client.js';
import { createPrayer } from './queries/prayers.js';
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

   for (let i = 0; i < 2; i++) {
      await createPrayer(2, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, architecto nulla? Officiis totam dignissimos enim reprehenderit tempore. Iure amet, totam fugit delectus commodi eligendi laboriosam numquam quas rem nesciunt consectetur.")
   }
   await createPrayer(4, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, architecto nulla? Officiis totam dignissimos enim reprehenderit tempore. Iure amet, totam fugit delectus commodi eligendi laboriosam numquam quas rem nesciunt consectetur.")
}

await db.connect();
await seed();
await db.end();
console.log(`Database Seeded 🌱`);