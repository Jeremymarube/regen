
 export default function Page() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">ReGen Dashboard</h2>
        <ul className="space-y-4">
          <li><a href="#" className="hover:text-gray-300">Dashboard</a></li>
          <li><a href="#" className="hover:text-gray-300">Log</a></li>
          <li><a href="#" className="hover:text-gray-300">AI guide</a></li>
        </ul>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4">Welcome to ReGen</h1>
        <p className="text-gray-600">Your dashboard overview goes here.</p>
      </main>
    </div>
  );
}

