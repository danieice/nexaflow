"use client";

import { useId, useState, type FormEvent } from "react";
import { daysUntil, toISODate, today } from "@/lib/dates";
import { isProjectStatus, PROJECT_STATUSES, type Project } from "@/lib/types";
import { useWorkspace, type NewProjectInput } from "@/store/workspace";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";

type Errors = Partial<Record<"name" | "managerId" | "deadline", string>>;

function validate(input: NewProjectInput): Errors {
  const errors: Errors = {};
  if (input.name.length < 2) errors.name = "Give the project a name, at least 2 characters.";
  if (!input.managerId) errors.managerId = "Pick who is leading it.";
  if (!input.deadline) errors.deadline = "Set a deadline.";
  else if (daysUntil(input.deadline) < 0) errors.deadline = "The deadline can't be in the past.";
  return errors;
}

type Props = {
  onDone: (project: Project) => void;
  onCancel: () => void;
};

export function NewProjectForm({ onDone, onCancel }: Props) {
  const { team, addProject } = useWorkspace();
  const notify = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const describedBy = (name: keyof Errors) => (errors[name] ? `${id(name)}-error` : undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const status = data.get("status");

    const input: NewProjectInput = {
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      managerId: String(data.get("managerId") ?? ""),
      deadline: String(data.get("deadline") ?? ""),
      status: isProjectStatus(status) ? status : "Pending",
    };

    const found = validate(input);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const project = addProject(input);
    notify(`"${project.name}" is on the board`);
    onDone(project);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field id={id("name")} label="Name" error={errors.name}>
        <input
          id={id("name")}
          name="name"
          required
          maxLength={60}
          autoFocus
          placeholder="e.g. Partner portal"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={inputClass}
        />
      </Field>

      <Field id={id("description")} label="Description">
        <textarea
          id={id("description")}
          name="description"
          rows={3}
          maxLength={200}
          placeholder="What is this project for? (optional)"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("managerId")} label="Lead" error={errors.managerId}>
          <select
            id={id("managerId")}
            name="managerId"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.managerId)}
            aria-describedby={describedBy("managerId")}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a lead
            </option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("deadline")} label="Deadline" error={errors.deadline}>
          <input
            id={id("deadline")}
            name="deadline"
            type="date"
            required
            min={toISODate(today())}
            aria-invalid={Boolean(errors.deadline)}
            aria-describedby={describedBy("deadline")}
            className={inputClass}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Status
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {PROJECT_STATUSES.map((status) => (
            <label key={status} className="cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status}
                defaultChecked={status === "Pending"}
                className="peer sr-only"
              />
              <span className="block rounded-full border border-line px-3 py-1.5 text-xs transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-card peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {status}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create project</Button>
      </div>
    </form>
  );
}