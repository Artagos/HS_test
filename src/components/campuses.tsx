import { MapPin, Sun, CloudRain, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const campuses = [
  {
    city: "Barcelona",
    country: "Spain",
    tagline: "Mediterranean innovation hub.",
    climate: "Sunny, 22°C avg",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    tagline: "Gateway to Southeast Asia.",
    climate: "Tropical, 30°C avg",
    icon: CloudRain,
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f45697ee?auto=format&fit=crop&w=800&q=80",
  },
];

export function Campuses() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex items-center gap-3">
        <Landmark className="h-6 w-6 text-brand" />
        <h2 className="text-3xl font-bold tracking-tight">Global Campuses</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {campuses.map((c) => (
          <Card key={c.city} className="overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${c.image})` }}
            />
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <CardTitle>
                  {c.city}, {c.country}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{c.tagline}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <c.icon className="h-4 w-4" />
                <span>{c.climate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
