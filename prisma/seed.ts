import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  const email = "eesa@hestonautomotive.com";

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists — skipping seed.");
    return;
  }

  await prisma.admin.create({
    data: {
      email,
      password: hashPassword("123123"),
      name: "Eesa",
    },
  });

  console.log("✓ Admin user created:", email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
