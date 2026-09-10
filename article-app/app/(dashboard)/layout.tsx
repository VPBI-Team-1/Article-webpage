"use clients";

import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import DesktopTopbar from "@/app/components/DesktopTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen lg:h-full">
      <header className="lg:hidden">
        <Navbar />
      </header>

      <div className="lg:flex lg:h-full">
        <aside className="hidden lg:block lg:h-full lg:w-70 lg:shrink-0">
          <Sidebar />
        </aside>

        <div className="min-w-0 flex-1 lg:flex lg:h-full lg:flex-col">
          <div className="hidden lg:block lg:shrink-0">
            <DesktopTopbar />
          </div>

          <main className="min-h-0 flex-1 lg:overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
