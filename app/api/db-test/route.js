import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma-example";

export async function POST() {
  // Example query - replace with your actual database query
  const data = await prisma.$queryRaw`SELECT 1+1 as result`;

  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
}
