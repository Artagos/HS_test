import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireRole(request, "ADMIN");
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const { status, notes } = await request.json();

    const application = await prisma.application.update({
      where: { id },
      data: { status, notes: notes ?? undefined },
      include: { user: true, program: true },
    });

    if (status === "INTERVIEW_SCHEDULED") {
      await prisma.mockEmail.create({
        data: {
          toAddress: application.user.email,
          subject: "Interview Invitation — Harbour.Space",
          body: `Hi ${application.user.firstName},\n\nCongratulations! We would like to invite you to an interview for ${application.program.title}. Please check your calendar for available slots.\n\nHarbour.Space Admissions`,
          trigger: "INTERVIEW_INVITATION",
        },
      });
    }

    return NextResponse.json({ application });
  } catch (err) {
    console.error("Application update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
