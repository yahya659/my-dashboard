"use client";

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold"> Dashboard</h1>
      <div className="flex gap-4 items-center">
        <span className="text-gray-300">Welcome, Developer </span>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
          Logout
        </button>
      </div>
    </header>
  );
}
