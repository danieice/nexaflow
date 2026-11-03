"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { seedProjects, seedTasks, team } from "@/data/seed";
import { toISODate, today } from "@/lib/dates";
import { PROJECT_COLORS, type Member, type Project, type Task, type TaskStatus } from "@/lib/types";

const STORAGE_KEY = "nexaflow:v1";

type State = {
  projects: Project[];
  tasks: Task[];
};

type Action =
  | { type: "loaded"; state: State }
  | { type: "projectAdded"; project: Project }
  | { type: "taskStatusChanged"; taskId: string; status: TaskStatus }
  | { type: "reset" };

const initialState: State = { projects: seedProjects, tasks: seedTasks };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loaded":
      return action.state;
    case "projectAdded":
      return { ...state, projects: [action.project, ...state.projects] };
    case "taskStatusChanged":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task
        ),
      };
    case "reset":
      return initialState;
  }
}

function readSaved(): State | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<State>;
    if (!Array.isArray(saved.projects) || !Array.isArray(saved.tasks)) return null;
    return { projects: saved.projects, tasks: saved.tasks };
  } catch {
    return null;
  }
}

export type NewProjectInput = Pick<
  Project,
  "name" | "description" | "managerId" | "deadline" | "status"
>;

type Workspace = State & {
  team: Member[];
  addProject: (input: NewProjectInput) => Project;
  setTaskStatus: (taskId: string, status: TaskStatus) => void;
  resetDemo: () => void;
};

const WorkspaceContext = createContext<Workspace | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaded, setLoaded] = useState(false);

  // read saved data after mount so the server and the first client render match
  useEffect(() => {
    const saved = readSaved();
    if (saved) dispatch({ type: "loaded", state: saved });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage blocked or full; the app keeps working in memory
    }
  }, [state, loaded]);

  const addProject = useCallback(
    (input: NewProjectInput) => {
      const project: Project = {
        ...input,
        id: crypto.randomUUID(),
        color: PROJECT_COLORS[state.projects.length % PROJECT_COLORS.length],
        createdAt: toISODate(today()),
      };
      dispatch({ type: "projectAdded", project });
      return project;
    },
    [state.projects.length]
  );

  const setTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    dispatch({ type: "taskStatusChanged", taskId, status });
  }, []);

  const resetDemo = useCallback(() => dispatch({ type: "reset" }), []);

  const value = useMemo(
    () => ({ ...state, team, addProject, setTaskStatus, resetDemo }),
    [state, addProject, setTaskStatus, resetDemo]
  );

  return (
  <WorkspaceContext.Provider value={value}>
    {loaded ? children : null}
  </WorkspaceContext.Provider>
);
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);
  if (!workspace) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return workspace;
}