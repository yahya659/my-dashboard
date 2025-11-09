"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/posts";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.slice(0, 12)); // نعرض أول 12 منشور فقط
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg animate-pulse">
        جاري تحميل المنشورات...
      </p>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10">
        حدث خطأ أثناء تحميل المنشورات 
        <br />
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
         قائمة المنشورات
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
            <span className="inline-block mt-3 text-blue-500 text-sm font-medium hover:underline">
              قراءة المزيد →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
