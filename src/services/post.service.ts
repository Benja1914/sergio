import { ApiUtils } from "@/utils/api.utils";
import { Post } from "@/store/postStore/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export class PostService {
  async getPosts(): Promise<Post[]> {
    const url = `${API_URL}/post`;
    try {
      const response = await ApiUtils.get<{ data: Post[] }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createPost(post: Post): Promise<Post> {
    const url = `${API_URL}/post/create`;
    try {
      return await ApiUtils.post<Post>(url, post, {
        "Content-Type": "application/json",
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: number): Promise<void> {
    const url = `${API_URL}/post/${id}`;
    try {
      await ApiUtils.delete(url);
    } catch (error) {
      throw error;
    }
  }
}