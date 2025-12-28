import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import LearningPaths from "@/components/dashboard/LearningPaths";
import Achievements from "@/components/dashboard/Achievements";
import SkillsChart from "@/components/dashboard/SkillsChart";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner userName="Alex" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LearningPaths />
          </div>
          <div className="space-y-8">
            <Achievements />
            <SkillsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
