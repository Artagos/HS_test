"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/apply-modal";
import { BrochureModal } from "@/components/brochure-modal";

export function ApplyModalTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="brand" onClick={() => setOpen(true)}>Apply Now</Button>
      <ApplyModal open={open} onOpenChange={setOpen} />
    </>
  );
}

export function BrochureModalTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Download Brochure</Button>
      <BrochureModal open={open} onOpenChange={setOpen} />
    </>
  );
}
