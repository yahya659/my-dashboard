"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
}

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // تحميل المستخدمين من localStorage عند تشغيل الصفحة
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  //  حفظ المستخدمين عند أي تعديل
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // إضافة أو تعديل المستخدم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editIndex !== null) {
        //  تعديل المستخدم
        const updatedUsers = [...users];
        updatedUsers[editIndex] = { name, email };
        setUsers(updatedUsers);
        setMessage(" تم تعديل المستخدم بنجاح!");
        setEditIndex(null);
      } else {
        //  إضافة مستخدم جديد
        const res = await axios.post<{ message: string }>("/api/users", { name, email });
        setMessage(res.data.message);
        setUsers((prev) => [...prev, { name, email }]);
      }

      setName("");
      setEmail("");
    } catch {
      setMessage(" حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  //  تعديل مستخدم
  const handleEdit = (index: number) => {
    setName(users[index].name);
    setEmail(users[index].email);
    setEditIndex(index);
  };

  //  حذف مستخدم واحد
  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    window.confirm("هل تريد بالفعل  حذف المستخدم")
    setUsers(updatedUsers);
    setMessage("🗑️ تم حذف المستخدم!");
    toast.success("تم الحذف بنجاح")
  };

  //  حذف جميع المستخدمين
    const handleDeleteAll = () => {
    // window.confirm("هل أنت متأكد أنك تريد حذف جميع المستخدمين؟ 🧨");
    setUsers([]);
    setMessage("تم حذف جميع المستخدمين")
    toast.success(" تم حذف جميع المستخدمين بنجاح!");

    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف جميع المستخدمين؟");
    if (confirmDelete) {
      setUsers([]);
      localStorage.removeItem("users");
      setMessage(" تم حذف جميع المستخدمين بنجاح!");
    }
  };



  //  واجهة المستخدم
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">
        {editIndex !== null ? "تعديل المستخدم ✏️" : "إضافة مستخدم جديد 👤"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading
            ? "جاري الإرسال..."
            : editIndex !== null
            ? "تحديث المستخدم"
            : "إرسال"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
      )}

      {users.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold"> قائمة المستخدمين:</h2>
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              حذف الكل
            </button>
          </div>

          <ul className="space-y-2">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <div>
                  <span className="font-medium">{user.name}</span> —{" "}
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
 /////////////






