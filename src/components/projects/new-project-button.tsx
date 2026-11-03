"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { NewProjectForm } from "./new-project-form";

type Props = {
  onCreated?: (project: Project) => void;
};

export function NewProjectButton({ onCreated }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" aria-hidden />
        New project
      </Button>
      <Dialog
        open={open}
        title="New project"
        description="It shows up on the board as soon as you create it."
        onClose={() => setOpen(false)}
      >
        <NewProjectForm
          onCancel={() => setOpen(false)}
          onDone={(project) => {
            setOpen(false);
            onCreated?.(project);
          }}
        />
      </Dialog>
    </>
  );
}