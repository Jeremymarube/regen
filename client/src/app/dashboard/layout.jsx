// import Sidebar from "@/components/layout/Sidebar";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-[#F9FAFB]">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <main className="flex-1 ml-6 px-6 py-10">
//         <div className="max-w-7xl mx-auto">{children}</div>
//       </main>
//     </div>
//   );
// }




import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 ml-50 px-8 py-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
