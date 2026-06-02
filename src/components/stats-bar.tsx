import { Trophy, Briefcase, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Trophy, label: "ICPC Gold Medallists", value: "12+" },
  { icon: Briefcase, label: "Employability Rate", value: "95%" },
  { icon: Globe, label: "Nationalities", value: "50+" },
  { icon: Clock, label: "Weeks per Module", value: "3" },
];

export function StatsBar() {
  return (
    <section className="border-b border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="mb-3 h-6 w-6 text-brand" />
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
