import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json({ programs });
  } catch (err) {
    console.error("Programs list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
