import DashboardLayout from "@/components/layout/DashboardLayout";
import { DocumentUploader } from "@/components/analysis/DocumentUploader";

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-headline">Document &amp; Code Analysis</h1>
          <p className="text-muted-foreground">Upload a file (PDF, TXT, etc.) to get a summary, corrections, or suggestions.</p>
        </header>
        <div className="flex-1">
          <DocumentUploader />
        </div>
      </div>
    </DashboardLayout>
  );
}
