import prisma from "../lib/prisma";

import bcryptjs from "bcryptjs";

async function main() {
  const iglesia = await prisma.iglesia.findMany();
  await prisma.user.createMany({
    data: [
      {
        email: "mibsamaragon@yahoo.com",
        password: bcryptjs.hashSync("12345678", 10),
        name: "Mibsam Aragon",
        iglesia_id: iglesia[0].id,
      },
    ],
  });
}

(() => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  main();
})();
