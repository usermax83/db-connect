import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

let prisma;

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;
const log = [/*"query", "info", "warn", */ "error"];

if (connectionString.includes("localhost")) {
  // https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: log,
    });
  }
  prisma = global.prisma;
} else {
  // use planetscale driver in serverless environment - it uses https instead of long tcp pooling
  // faster and more reliable connection
  // https://www.npmjs.com/package/@prisma/adapter-planetscale
  const client = new Client({ url: connectionString });
  const adapter = new PrismaPlanetScale(client);
  prisma = new PrismaClient({ adapter, log: log });
}

export default prisma;
