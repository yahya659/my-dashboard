"use client";

import { useEffect, useState } from "react";
import { getPosts, Post } from "@/services/posts";



export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("فشل تحميل المنشورات ");
      } finally {//في حاله قطع اللنت اثناء التحميل يتم عمل جاري التحميل حتى استعاده للنت 
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())//داله البحث
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        ⏳ جارٍ تحميل المنشورات...
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
      <h1 className="text-2xl font-bold text-blue-600 mb-4">المنشورات 📰</h1>

      <input
        type="text"
        placeholder="ابحث عن منشور..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 rounded-md mb-5 w-full md:w-1/2"
      />

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 mt-4">لا توجد منشورات مطابقة 🔍</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.slice(0, 9).map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
