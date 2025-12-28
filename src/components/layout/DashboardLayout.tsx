import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <div className="bg-background">
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="min-h-[calc(100vh-4rem)]">
                    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
