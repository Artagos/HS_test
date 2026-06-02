"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/apply-modal";
import { BrochureModal } from "@/components/brochure-modal";

export function ProgramDetailActions() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <>
      <Button variant="brand" onClick={() => setApplyOpen(true)}>Apply Now</Button>
      <Button variant="outline" onClick={() => setBrochureOpen(true)}>Download Brochure</Button>
      <ApplyModal open={applyOpen} onOpenChange={setApplyOpen} />
      <BrochureModal open={brochureOpen} onOpenChange={setBrochureOpen} />
    </>
  );
}
