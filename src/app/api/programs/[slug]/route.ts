import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ program });
  } catch (err) {
    console.error("Program detail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
