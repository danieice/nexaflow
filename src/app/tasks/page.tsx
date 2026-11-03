import { TasksView } from "@/components/tasks/tasks-view";
import { isTaskFilter } from "@/lib/selectors";

export const metadata = { title: "Tasks · NexaFlow" };

type Props = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function TasksPage({ searchParams }: Props) {
  const { filter } = await searchParams;
  const initialFilter = isTaskFilter(filter) ? filter : "all";

  return <TasksView key={initialFilter} initialFilter={initialFilter} />;
}