export interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "ADMIN";
}

export interface ApiProgram {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  category: string;
  durationWeeks: number;
  modules: number;
  imageUrl: string | null;
  createdAt: string;
}

export interface ApiApplication {
  id: string;
  userId: string;
  programId: string;
  campus: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  program: ApiProgram;
}

export interface ApiLead {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  programId: string | null;
  campus: string | null;
  source: string;
  createdAt: string;
}

export interface ApiMockEmail {
  id: string;
  toAddress: string;
  subject: string;
  body: string;
  trigger: string;
  sentAt: string;
}

export interface ApiStudentData {
  id: string;
  userId: string;
  currentModule: number;
  mentorName: string | null;
  englishCert: boolean;
  transcripts: boolean;
  visaStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiDashboard {
  user: ApiUser;
  application: ApiApplication | null;
  studentData: ApiStudentData & {
    totalModules: number;
    remainingModules: number;
    modulesCompleted: number;
  };
}

export async function fetchPrograms(): Promise<ApiProgram[]> {
  const res = await fetch("/api/programs", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch programs");
  const data = await res.json();
  return data.programs;
}

export async function fetchProgram(slug: string): Promise<ApiProgram> {
  const res = await fetch(`/api/programs/${slug}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch program");
  const data = await res.json();
  return data.program;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<{ user: ApiUser }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function registerUser(payload: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{ user: ApiUser }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function fetchDashboard(): Promise<ApiDashboard> {
  const res = await fetch("/api/student/dashboard", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  const data = await res.json();
  return data;
}

export async function fetchApplications(): Promise<ApiApplication[]> {
  const res = await fetch("/api/applications", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch applications");
  const data = await res.json();
  return data.applications;
}

export async function createApplication(payload: {
  programId: string;
  campus: string;
}): Promise<ApiApplication> {
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create application");
  return data.application;
}

export async function updateApplication(
  id: string,
  payload: { status: string; notes?: string }
): Promise<ApiApplication> {
  const res = await fetch(`/api/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update application");
  return data.application;
}

export async function fetchLeads(): Promise<ApiLead[]> {
  const res = await fetch("/api/leads", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch leads");
  const data = await res.json();
  return data.leads;
}

export async function createLead(payload: {
  email: string;
  firstName?: string;
  lastName?: string;
  programId?: string;
  campus?: string;
  source?: string;
}): Promise<ApiLead> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create lead");
  return data.lead;
}

export async function fetchEmails(): Promise<ApiMockEmail[]> {
  const res = await fetch("/api/mock-emails", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch emails");
  const data = await res.json();
  return data.emails;
}
