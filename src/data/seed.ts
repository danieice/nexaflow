import { daysFromToday } from "@/lib/dates";
import type { Member, Project, Task } from "@/lib/types";

export const currentUser = { name: "Daniel", role: "Product lead" };

export const team: Member[] = [
  { id: "m1", name: "Amina Bello", role: "Product designer" },
  { id: "m2", name: "Junior Ngono", role: "Backend engineer" },
  { id: "m3", name: "Chidinma Okafor", role: "Brand lead" },
  { id: "m4", name: "Paul Etoundi", role: "Support manager" },
  { id: "m5", name: "Sarah Mbah", role: "Growth marketer" },
];

export const seedProjects: Project[] = [
  {
    id: "p1",
    name: "Mobile Checkout Revamp",
    description: "Cut the checkout down to one screen and fix where people drop off.",
    managerId: "m1",
    deadline: daysFromToday(12),
    status: "In Progress",
    color: "tomato",
    createdAt: daysFromToday(-30),
  },
  {
    id: "p2",
    name: "Brand Refresh",
    description: "New logo, type and deck template before the funding round.",
    managerId: "m3",
    deadline: daysFromToday(25),
    status: "In Progress",
    color: "plum",
    createdAt: daysFromToday(-18),
  },
  {
    id: "p3",
    name: "Customer Help Center",
    description: "Self-serve answers for the questions support gets every day.",
    managerId: "m4",
    deadline: daysFromToday(40),
    status: "Pending",
    color: "sage",
    createdAt: daysFromToday(-5),
  },
  {
    id: "p4",
    name: "Payments API Migration",
    description: "Move every payment flow to the v2 provider API.",
    managerId: "m2",
    deadline: daysFromToday(-3),
    status: "In Progress",
    color: "cobalt",
    createdAt: daysFromToday(-45),
  },
  {
    id: "p5",
    name: "Onboarding Emails",
    description: "A short welcome sequence for new team accounts.",
    managerId: "m5",
    deadline: daysFromToday(-10),
    status: "Completed",
    color: "ochre",
    createdAt: daysFromToday(-40),
  },
  {
    id: "p6",
    name: "Analytics Dashboard v2",
    description: "Give sales the numbers they keep asking engineering for.",
    managerId: "m2",
    deadline: daysFromToday(60),
    status: "Pending",
    color: "teal",
    createdAt: daysFromToday(-2),
  },
];

export const seedTasks: Task[] = [
  { id: "t1", title: "Map checkout drop-off points", priority: "High", status: "Done", deadline: daysFromToday(-8), projectId: "p1" },
  { id: "t2", title: "Wireframe one-page checkout", priority: "High", status: "Done", deadline: daysFromToday(-4), projectId: "p1" },
  { id: "t3", title: "Build address autocomplete", priority: "Medium", status: "In Progress", deadline: daysFromToday(2), projectId: "p1" },
  { id: "t4", title: "Usability test with 5 customers", priority: "High", status: "To Do", deadline: daysFromToday(6), projectId: "p1" },
  { id: "t5", title: "Collect logo directions", priority: "Medium", status: "Done", deadline: daysFromToday(-6), projectId: "p2" },
  { id: "t6", title: "Pick the final typeface pair", priority: "Low", status: "In Progress", deadline: daysFromToday(1), projectId: "p2" },
  { id: "t7", title: "Update the pitch deck template", priority: "Low", status: "To Do", deadline: daysFromToday(9), projectId: "p2" },
  { id: "t8", title: "List the top 20 support questions", priority: "Medium", status: "To Do", deadline: daysFromToday(14), projectId: "p3" },
  { id: "t9", title: "Choose a help center tool", priority: "Low", status: "To Do", deadline: daysFromToday(18), projectId: "p3" },
  { id: "t10", title: "Move webhooks to the v2 endpoint", priority: "High", status: "Done", deadline: daysFromToday(-9), projectId: "p4" },
  { id: "t11", title: "Backfill failed transactions", priority: "High", status: "In Progress", deadline: daysFromToday(-2), projectId: "p4" },
  { id: "t12", title: "Write the rollback runbook", priority: "Medium", status: "To Do", deadline: daysFromToday(-1), projectId: "p4" },
  { id: "t13", title: "Write the welcome sequence", priority: "Medium", status: "Done", deadline: daysFromToday(-20), projectId: "p5" },
  { id: "t14", title: "Set up the send timing", priority: "Low", status: "Done", deadline: daysFromToday(-14), projectId: "p5" },
  { id: "t15", title: "Agree on core metrics with sales", priority: "Medium", status: "To Do", deadline: daysFromToday(21), projectId: "p6" },
];