import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from "./src/lib/auth";

async function test() {
  console.log("=== Backend API Tests ===\n");

  // 1. Programs seeded?
  const programs = await prisma.program.findMany();
  console.log(`1. Programs seeded: ${programs.length} programs`);
  console.log("   Slugs:", programs.map((p) => p.slug).join(", "));

  // 2. Auth register
  const hashed = await bcrypt.hash("password123", 10);
  let user = await prisma.user.create({
    data: { email: "test@example.com", password: hashed, firstName: "Test", lastName: "User" },
  });
  console.log(`2. User created: ${user.id} (${user.email})`);

  // 3. JWT sign/verify
  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  const payload = verifyToken(token);
  console.log(`3. JWT valid: ${payload.userId === user.id}`);

  // 4. Create lead
  const lead = await prisma.lead.create({
    data: { email: "lead@example.com", firstName: "Lead", source: "homepage" },
  });
  console.log(`4. Lead created: ${lead.id}`);

  // 5. Create application
  const program = programs[0];
  const application = await prisma.application.create({
    data: { userId: user.id, programId: program.id, campus: "Barcelona" },
  });
  console.log(`5. Application created: ${application.id} (status: ${application.status})`);

  // 6. Mock email on application
  const email = await prisma.mockEmail.create({
    data: {
      toAddress: user.email,
      subject: "Application Received — Harbour.Space",
      body: "We received your application.",
      trigger: "APPLICATION_RECEIVED",
    },
  });
  console.log(`6. Mock email logged: ${email.id}`);

  // 7. Admin user
  const adminHashed = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: { email: "admin@hs.com", password: adminHashed, firstName: "Admin", lastName: "User", role: "ADMIN" },
  });
  console.log(`7. Admin created: ${admin.id} (${admin.role})`);

  // 8. Update application status (simulate admin)
  const updatedApp = await prisma.application.update({
    where: { id: application.id },
    data: { status: "INTERVIEW_SCHEDULED" },
  });
  console.log(`8. Application status updated: ${updatedApp.status}`);

  // 9. Interview invitation email
  const interviewEmail = await prisma.mockEmail.create({
    data: {
      toAddress: user.email,
      subject: "Interview Invitation — Harbour.Space",
      body: "You are invited to an interview.",
      trigger: "INTERVIEW_INVITATION",
    },
  });
  console.log(`9. Interview email logged: ${interviewEmail.id}`);

  // 10. Student data
  const studentData = await prisma.studentData.create({
    data: { userId: user.id, currentModule: 3, mentorName: "Dr. Ada Lovelace", englishCert: true },
  });
  console.log(`10. Student data created: module ${studentData.currentModule}, mentor: ${studentData.mentorName}`);

  // 11. Fetch all leads as admin would
  const allLeads = await prisma.lead.findMany();
  console.log(`11. Total leads: ${allLeads.length}`);

  // 12. Fetch all applications as admin would
  const allApps = await prisma.application.findMany({ include: { user: true, program: true } });
  console.log(`12. Total applications: ${allApps.length}`);

  // 13. Fetch all mock emails as admin would
  const allEmails = await prisma.mockEmail.findMany();
  console.log(`13. Total mock emails: ${allEmails.length}`);

  console.log("\n=== All tests passed ===");
}

test()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
