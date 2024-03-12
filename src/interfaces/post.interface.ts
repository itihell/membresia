import { Category } from "./category.interface";
import { PostHasImage } from "./postHasImage.interface";
import { User } from "./user.interface";

export interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  published: string;
  userId: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  category: Category;
  PostHasImage: PostHasImage[];
  images: string[];
}
