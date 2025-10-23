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
      {/* <main className="flex-1 ml-[180px] pl-3 pr-8 py-10">
  <div className="max-w-7xl mx-auto">
    {children}
  </div>
</main> */}
     <main className="flex-1 ml-[180px] pl-4 pr-12 py-10">
  <div className="max-w-7xl mx-auto">{children}</div>
</main>
    </div> 
  );
}
