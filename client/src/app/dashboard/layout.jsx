import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] ">
      {/* Sidebar */}
      <div className="hidden lg:block">
      <Sidebar />
      </div>
     
    <main className="flex-1 lg:ml-[180px] px-4 lg:px-8 py-8" style={{ zoom: '0.9' }}>
  <div className="max-w-7xl mx-auto w-full">{children}</div>
</main>
    </div>

  );
}


