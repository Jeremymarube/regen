import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] ">
      {/* Sidebar */}
      <Sidebar />
     {/* <main className="flex-1 ml-[180px] pl-4 pr-12 py-10">
  <div className="max-w-7xl mx-auto">{children}</div>
</main>
    </div>  */}
    <main className="flex-1 ml-[180px] px-8 py-8" style={{ zoom: '0.9' }}>
  <div className="max-w-7xl mx-auto w-full">{children}</div>
</main>
    </div>

  );
}


