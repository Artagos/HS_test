import Link from "next/link";
import { programs } from "@/lib/programs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function ProgramsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-brand" />
        <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <Card key={p.slug} className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{p.title}</CardTitle>
                <Badge variant={p.category === "Technology" ? "default" : "secondary"}>
                  {p.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {p.description}
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/programs/${p.slug}`}>Explore Program</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
