import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { Campuses } from "@/components/campuses";
import { ProgramsGrid } from "@/components/programs-grid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StatsBar />
      <ProgramsGrid />
      <Campuses />
    </div>
  );
}
