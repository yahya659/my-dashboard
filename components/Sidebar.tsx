"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:text-gray-300"> Home</Link>
        <Link href="/posts" className="hover:text-gray-300"> Posts</Link>
        <Link href="/dashboard/users" className="hover:text-gray-300">👥 Users</Link>
      </nav>
    </aside>
  );
}
