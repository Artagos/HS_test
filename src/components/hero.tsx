"use client";

import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/apply-modal";
import { BrochureModal } from "@/components/brochure-modal";
import { useState } from "react";

export function Hero() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Tech, Entrepreneurship,{" "}
            <span className="text-brand">and Design</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            A new model of higher education. 14 modules, 3 weeks each. Immersive,
            industry-led, and designed for the builders of tomorrow.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="brand" size="lg" onClick={() => setApplyOpen(true)}>
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setBrochureOpen(true)}
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-48 h-64 w-64 rounded-full bg-brand/5 blur-2xl" />

      <ApplyModal open={applyOpen} onOpenChange={setApplyOpen} />
      <BrochureModal open={brochureOpen} onOpenChange={setBrochureOpen} />
    </section>
  );
}
