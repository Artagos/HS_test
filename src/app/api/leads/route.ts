import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, programId, campus, source } = body;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { email, firstName, lastName, programId, campus, source: source || "homepage" },
    });

    return NextResponse.json({ lead });
  } catch (err) {
    console.error("Lead create error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const auth = requireRole(request, "ADMIN");
  if (auth.error) return auth.error;

  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("Lead list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
