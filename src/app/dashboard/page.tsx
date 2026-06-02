"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { fetchDashboard, type ApiDashboard } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User, FileText, Globe, CalendarDays } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const [data, setData] = useState<ApiDashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "STUDENT") {
      router.push("/login");
      return;
    }
    fetchDashboard()
      .then(setData)
      .catch(() => setError("Failed to load dashboard"));
  }, [user, router]);

  if (!user || user.role !== "STUDENT") return null;

  const currentModule = data?.studentData?.currentModule ?? 1;
  const totalModules = data?.studentData?.totalModules ?? 14;
  const daysLeft = 12;
  const mentor = data?.studentData?.mentorName ?? "TBD";
  const campus = data?.application?.campus ?? "Barcelona";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back, {user.firstName} {user.lastName}
      </p>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Current Module */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              <CardTitle>Current Module</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  Module {currentModule}: Databases
                </p>
                <p className="mt-1 text-muted-foreground">
                  {data?.application?.program?.title ?? "Computer Science"}
                </p>
              </div>
              <Badge variant="brand">Active</Badge>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Days Remaining
                </div>
                <p className="mt-1 text-xl font-semibold">{daysLeft} days</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Industry Mentor
                </div>
                <p className="mt-1 text-xl font-semibold">{mentor}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  Campus
                </div>
                <p className="mt-1 text-xl font-semibold">{campus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-brand" />
              <CardTitle>Today's Schedule</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "09:00", label: "Live Lecture: SQL Optimization" },
              { time: "11:00", label: "Breakout Session" },
              { time: "14:00", label: "Mentor Check-in" },
              { time: "16:00", label: "Lab: Indexing Strategies" },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                  {s.time}
                </div>
                <div className="text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Academic Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: totalModules }).map((_, i) => {
                const mod = i + 1;
                const status =
                  mod < currentModule
                    ? "completed"
                    : mod === currentModule
                    ? "active"
                    : "upcoming";
                const styles =
                  status === "completed"
                    ? "bg-primary text-primary-foreground"
                    : status === "active"
                    ? "bg-brand text-brand-foreground ring-2 ring-brand/30"
                    : "bg-muted text-muted-foreground";
                return (
                  <div
                    key={mod}
                    className={`flex flex-col items-center justify-center rounded-md p-2 text-xs font-medium transition-colors ${styles}`}
                  >
                    <span className="text-[10px] uppercase opacity-70">M</span>
                    <span>{mod}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                Completed
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                Active
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-muted" />
                Upcoming
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile / Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand" />
              <CardTitle>Documents</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "English Proficiency", done: data?.studentData?.englishCert ?? false },
              { label: "Academic Transcripts", done: data?.studentData?.transcripts ?? false },
              { label: "Visa Application", done: (data?.studentData?.visaStatus ?? "PENDING") !== "PENDING" },
              { label: "Health Insurance", done: false },
            ].map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
              >
                <span className="text-sm">{d.label}</span>
                <Badge variant={d.done ? "default" : "outline"}>
                  {d.done ? "Submitted" : "Pending"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
