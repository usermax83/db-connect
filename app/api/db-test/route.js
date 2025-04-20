import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  const data = await testConnectionInLoop(1000);

  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
}

async function testConnectionInLoop(count) {
  return await Promise.all(
    Array.from({ length: count }, async (_, i) => {
      const prisma = new PrismaClient();
      const data = await prisma.$queryRaw`SELECT "1+1" as result`;
      return data;
    })
  );
}
