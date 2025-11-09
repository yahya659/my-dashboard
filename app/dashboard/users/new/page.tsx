"use client";

import { useState } from "react";
import axios from "axios";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    // setMessage("يتم الان الاانشاء");

    try {
      await axios.post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
      });
      setName("");
      setEmail("");
      setMessage(" تم إضافة المستخدم بنجاح!");
      
    } catch (error) {
      setMessage(" حدث خطأ أثناء الإرسال!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">إضافة مستخدم جديد</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            الاسم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="اكتب الاسم هنا"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
