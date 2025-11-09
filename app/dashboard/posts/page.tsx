"use client";

import { useEffect, useState } from "react";
import { getUsers, User } from "@/services/users";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("فشل تحميل بيانات المستخدمين ");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
         جارٍ تحميل المستخدمين...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center mt-10 text-lg font-semibold">
        {error}
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-4">👥 المستخدمين</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2 text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

