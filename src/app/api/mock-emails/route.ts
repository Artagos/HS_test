import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const auth = requireRole(request, "ADMIN");
  if (auth.error) return auth.error;

  try {
    const { toAddress, subject, body, trigger } = await request.json();
    if (!toAddress || !subject || !body) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const email = await prisma.mockEmail.create({
      data: { toAddress, subject, body, trigger: trigger || "MANUAL" },
    });

    return NextResponse.json({ email });
  } catch (err) {
    console.error("Mock email create error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const auth = requireRole(request, "ADMIN");
  if (auth.error) return auth.error;

  try {
    const emails = await prisma.mockEmail.findMany({ orderBy: { sentAt: "desc" } });
    return NextResponse.json({ emails });
  } catch (err) {
    console.error("Mock email list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
