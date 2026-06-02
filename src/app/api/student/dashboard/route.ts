import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = getAuthUser(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: { application: { include: { program: true } }, studentData: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let studentData = user.studentData;
    if (!studentData) {
      studentData = await prisma.studentData.create({
        data: { userId: user.id },
      });
    }

    const totalModules = user.application?.program?.modules ?? 14;
    const currentModule = studentData.currentModule;
    const remainingModules = totalModules - currentModule;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      application: user.application,
      studentData: {
        ...studentData,
        totalModules,
        remainingModules,
        modulesCompleted: currentModule - 1,
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
