"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { fetchEmails, type ApiMockEmail } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

export default function EmailsPage() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const [emails, setEmails] = useState<ApiMockEmail[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/login");
      return;
    }
    fetchEmails()
      .then(setEmails)
      .catch(() => setError("Failed to load emails"));
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex items-center gap-3">
        <Mail className="h-7 w-7 text-brand" />
        <h1 className="text-3xl font-bold tracking-tight">Mock Email Service</h1>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle>Sent Emails</CardTitle>
        </CardHeader>
        <CardContent>
          {emails.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No emails sent yet. Submit an application or advance an application in the CRM to trigger emails.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{email.subject}</span>
                      <Badge variant="outline" className="text-xs">
                        {email.trigger}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(email.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    To: {email.toAddress}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {email.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
