"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchPrograms, createApplication, type ApiProgram } from "@/lib/api";

export function ApplyModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [apiPrograms, setApiPrograms] = useState<ApiProgram[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    programId: "",
    campus: "Barcelona",
  });

  useEffect(() => {
    if (open) {
      fetchPrograms()
        .then((ps) => {
          setApiPrograms(ps);
          if (ps.length > 0) {
            setForm((prev) => ({ ...prev, programId: ps[0].id }));
          }
        })
        .catch(() => setError("Could not load programs"));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createApplication({ programId: form.programId, campus: form.campus });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onOpenChange(false);
        setForm({ name: "", email: "", programId: apiPrograms[0]?.id || "", campus: "Barcelona" });
      }, 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to Harbour.Space</DialogTitle>
          <DialogDescription>
            Start your journey. Fill in your details and we will be in touch.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-medium text-brand">Application Submitted!</p>
            <p className="text-sm text-muted-foreground mt-2">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ada Lovelace"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ada@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Program</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.programId}
                onChange={(e) => setForm({ ...form, programId: e.target.value })}
              >
                {apiPrograms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Campus</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.campus}
                onChange={(e) => setForm({ ...form, campus: e.target.value })}
              >
                <option>Barcelona</option>
                <option>Bangkok</option>
              </select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="submit" variant="brand">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
