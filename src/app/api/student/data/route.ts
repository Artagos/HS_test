import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const auth = requireRole(request, "ADMIN");
  if (auth.error) return auth.error;

  try {
    const { userId, currentModule, mentorName, englishCert, transcripts, visaStatus } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const studentData = await prisma.studentData.upsert({
      where: { userId },
      update: {
        currentModule: currentModule ?? undefined,
        mentorName: mentorName ?? undefined,
        englishCert: englishCert ?? undefined,
        transcripts: transcripts ?? undefined,
        visaStatus: visaStatus ?? undefined,
      },
      create: {
        userId,
        currentModule: currentModule ?? 1,
        mentorName,
        englishCert: englishCert ?? false,
        transcripts: transcripts ?? false,
        visaStatus: visaStatus ?? "PENDING",
      },
    });

    return NextResponse.json({ studentData });
  } catch (err) {
    console.error("Student data update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
