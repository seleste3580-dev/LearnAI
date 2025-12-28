import DashboardLayout from "@/components/layout/DashboardLayout";
import { TutorChat } from "@/components/tutor/TutorChat";

export default function TutorPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-headline">AI Tutor</h1>
          <p className="text-muted-foreground">Ask anything! From complex code to career advice.</p>
        </header>
        <div className="flex-1">
          <TutorChat />
        </div>
      </div>
    </DashboardLayout>
  );
}
