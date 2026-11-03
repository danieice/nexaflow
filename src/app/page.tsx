import { ProjectProgress } from "@/components/dashboard/project-progress";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { StatsRow } from "@/components/dashboard/stats.row";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { Welcome } from "@/components/dashboard/welcome";

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      <Welcome />
      <StatsRow />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <ProjectProgress />
        <UpcomingTasks />
      </div>
      <RecentProjects />
    </div>
  );
} 