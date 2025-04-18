import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Helper function to serialize BigInt
const serialize = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export async function POST() {
  try {
    console.log("Testing database connection...");

    // Test the connection with a simple query that returns regular integers
    const result = await prisma.$queryRaw`SELECT CAST(1 AS SIGNED) as test`;
    console.log("Query successful:", result);

    return NextResponse.json({
      success: true,
      result: serialize(result),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
    });

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          code: error.code,
          meta: error.meta,
        },
      },
      { status: 500 }
    );
  }
}
