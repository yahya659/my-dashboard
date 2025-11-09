import { getPostById } from "@/services/posts";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostDetails({ params }: PostPageProps) {
  const { postId } = await params;

  try {
    const post: Post = await getPostById(postId);

    return (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed">{post.body}</p>

        <div className="mt-6">
          <Link
            href="/posts"
            className="text-sm text-blue-500 hover:text-blue-700 underline" 
          >
            ← الرجوع إلى قائمة المنشورات
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        حدث خطأ أثناء تحميل تفاصيل المنشور.
        <br />
        <Link href="/posts" className="text-blue-600 hover:underline">
          ← الرجوع
        </Link>
      </div>
    );
  }
}
