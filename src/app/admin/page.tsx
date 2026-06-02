"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  fetchApplications,
  updateApplication,
  fetchLeads,
  type ApiApplication,
  type ApiLead,
} from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, Users, ChevronRight } from "lucide-react";

const STAGES = [
  "SUBMITTED",
  "INTERVIEW_SCHEDULED",
  "ACCEPTED",
  "ENROLLED",
] as const;

const NEXT_STAGE: Record<string, string | null> = {
  SUBMITTED: "INTERVIEW_SCHEDULED",
  INTERVIEW_SCHEDULED: "ACCEPTED",
  ACCEPTED: "ENROLLED",
  ENROLLED: null,
};

const STAGE_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  ACCEPTED: "Accepted",
  ENROLLED: "Enrolled",
};

export default function AdminPage() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [tab, setTab] = useState("applications");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/login");
      return;
    }
    Promise.all([fetchApplications(), fetchLeads()])
      .then(([apps, ls]) => {
        setApplications(apps);
        setLeads(ls);
      })
      .catch(() => setError("Failed to load admin data"))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  const advance = async (app: ApiApplication) => {
    const next = NEXT_STAGE[app.status];
    if (!next) return;
    try {
      const updated = await updateApplication(app.id, { status: next });
      setApplications((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    } catch {
      setError("Failed to update status");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex items-center gap-3">
        <ShieldCheck className="h-7 w-7 text-brand" />
        <h1 className="text-3xl font-bold tracking-tight">Admin CRM</h1>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {STAGES.map((stage) => (
              <div key={stage} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {STAGE_LABELS[stage]}
                  </h3>
                  <Badge variant="outline">
                    {applications.filter((a) => a.status === stage).length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {applications
                    .filter((a) => a.status === stage)
                    .map((app) => (
                      <Card key={app.id} className="border-l-4 border-l-brand">
                        <CardContent className="p-4">
                          <p className="font-medium">
                            {app.user.firstName} {app.user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {app.user.email}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>{app.program.title}</span>
                            <span>•</span>
                            <span>{app.campus}</span>
                          </div>
                          {NEXT_STAGE[app.status] && (
                            <Button
                              className="mt-3 w-full"
                              size="sm"
                              variant="outline"
                              onClick={() => advance(app)}
                            >
                              Advance
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand" />
                <CardTitle>Homepage Leads</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No leads yet. Submit the brochure form on the homepage to see them here.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Email</th>
                        <th className="pb-2 font-medium">Program</th>
                        <th className="pb-2 font-medium">Campus</th>
                        <th className="pb-2 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id} className="border-b last:border-0">
                          <td className="py-3">
                            {l.firstName} {l.lastName}
                          </td>
                          <td className="py-3">{l.email}</td>
                          <td className="py-3">
                            {applications.find((a) => a.programId === l.programId)
                              ?.program.title ?? l.programId}
                          </td>
                          <td className="py-3">{l.campus}</td>
                          <td className="py-3 text-muted-foreground">
                            {new Date(l.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
