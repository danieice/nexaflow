live link: https://nexaflow-xi-flame.vercel.app

# NexaFlow

A frontend-only project management dashboard built for the NexaFlow technical challenge.
All data is simulated locally; there is no backend, API or database.

## Run it

Requires Node 18.18 or newer and pnpm.

    pnpm install
    pnpm dev

Open http://localhost:3000. Data is saved in localStorage; use "Reset demo data" in the profile menu to start over.

## Design direction

A "studio paper" look: warm paper background, ink text, a serif display face (Instrument Serif)
with a mono face (IBM Plex Mono) for numbers and dates. Each project gets a colored paper tab as
its visual identity. The header is a frosted glass pill; on mobile the same pill becomes the bottom
navigation, so one motif carries across screen sizes.

## Features

- Overview: welcome summary, stats, overall progress ring, per-project progress bars,
  upcoming tasks and recent projects. Stat cards link to the matching filtered list.
- Projects: search (name, description, lead), status filter and sort by deadline, newest or
  progress, all combinable. Clear filters at any time.
- Tasks: grouped by status, filter by overdue, due this week or done, and by project.
  Status changes move the task and update every stat.
- New project modal with validation, feedback toast and highlight of the new card.
- Notifications list overdue and due-today tasks.
- Empty states, responsive layout, keyboard support and visible focus.

## Architecture

    src/
      app/            routes: overview, projects, tasks (App Router)
      components/
        layout/       sidebar, glass header, mobile nav
        dashboard/    welcome, stats, progress, upcoming, recent
        projects/     card, toolbar, new project form and modal
        tasks/        task item, status select, tasks view
        ui/           dialog, button, field, toast, empty state, progress bar and ring
      data/seed.ts    sample team, projects and tasks
      lib/            types, date helpers, selectors (all calculations)
      store/          React context + useReducer, persisted to localStorage

- **Single source of truth:** state lives in one reducer. Every stat, progress value and
  "overdue" flag is calculated from the data in `lib/selectors.ts`, never stored, so the
  numbers always agree.
- **Project progress** is completed tasks divided by total tasks; a Completed project is 100%.
- **Seed dates are relative to today,** so upcoming and overdue always make sense.

## Libraries

- **lucide-react**: consistent icon set, tree-shaken so only used icons ship.
- **clsx**: small helper for conditional class names.
- No UI or chart library. The modal is the native `<dialog>` element, menus use the native
  Popover API, and charts are hand-built SVG.

## AI use

I used Claude (Anthropic) as a guide during the challenge for planning, explanations and
code suggestions. I typed and tested the code myself and can explain and modify every part of it.