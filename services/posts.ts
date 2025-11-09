import api from "@/services/api";

export interface Post {
  id: number;
  title: string;
  body: string;
}

//  جلب جميع المنشورات
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
};

//  جلب منشور واحد حسب الـ ID
export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};
