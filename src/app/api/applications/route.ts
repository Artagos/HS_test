import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const auth = getAuthUser(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { programId, campus } = await request.json();
    if (!programId || !campus) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.application.findUnique({ where: { userId: auth.userId } });
    if (existing) {
      return NextResponse.json({ error: "Application already exists" }, { status: 409 });
    }

    const application = await prisma.application.create({
      data: { userId: auth.userId, programId, campus },
      include: { program: true },
    });

    await prisma.mockEmail.create({
      data: {
        toAddress: auth.email,
        subject: "Application Received — Harbour.Space",
        body: `Hi there,\n\nWe have received your application for ${application.program.title}. We will review it and get back to you shortly.\n\nHarbour.Space Admissions`,
        trigger: "APPLICATION_RECEIVED",
      },
    });

    return NextResponse.json({ application });
  } catch (err) {
    console.error("Application create error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (auth.role === "ADMIN") {
      const applications = await prisma.application.findMany({
        include: { user: { select: { id: true, email: true, firstName: true, lastName: true } }, program: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ applications });
    }

    const application = await prisma.application.findUnique({
      where: { userId: auth.userId },
      include: { program: true },
    });
    return NextResponse.json({ application });
  } catch (err) {
    console.error("Application fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
