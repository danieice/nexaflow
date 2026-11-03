export const PROJECT_STATUSES = ["Pending", "In Progress", "Completed"] as const;
export const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;
export const PRIORITIES = ["Low", "Medium", "High"] as const;
export const PROJECT_COLORS = ["tomato", "ochre", "sage", "cobalt", "plum", "teal"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type ProjectColor = (typeof PROJECT_COLORS)[number];

export type Member = {
  id: string;
  name: string;
  role: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  managerId: string;
  deadline: string; // yyyy-mm-dd
  status: ProjectStatus;
  color: ProjectColor;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  deadline: string;
  projectId: string;
};