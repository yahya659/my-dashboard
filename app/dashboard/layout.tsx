import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">My Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          
          <Link href="/dashboard/posts" className="text-gray-700 hover:text-blue-600">
            المنشورات
          </Link>
          <Link href="/dashboard/users" className="text-gray-700 hover:text-blue-600">
             المستخدمين
          </Link>
         
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Navbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800"> لوحة التحكم</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            تسجيل خروج
          </button>
        </header>

        {/* Page content */}
        {children}
      </main>
    </div>
  );
}
