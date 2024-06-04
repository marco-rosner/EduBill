/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 3 invoices
  await seed.invoice((x) => x(3));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();