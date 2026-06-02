import Link from "next/link";
import { notFound } from "next/navigation";
import { programs } from "@/lib/programs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramDetailActions } from "@/components/program-detail-actions";
import { ArrowLeft, Clock, Layers } from "lucide-react";

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ProgramDetail params={params} />;
}

async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/programs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Link>
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {program.title}
              </h1>
              <Badge variant={program.category === "Technology" ? "default" : "secondary"}>
                {program.category}
              </Badge>
            </div>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {program.description}
            </p>
          </div>
          <div className="flex gap-3">
            <ProgramDetailActions />
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand" />
          <span>14 Modules</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand" />
          <span>3 Weeks per Module</span>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold tracking-tight">Academic Timeline</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {program.modules.map((m) => (
          <Card key={m.number} className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-brand" />
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Module {m.number}: {m.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{m.weeks} weeks</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
