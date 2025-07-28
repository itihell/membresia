import type { Category } from "./category.interface";
import type { PostHasImage } from "./postHasImage.interface";
import type { User } from "./user.interface";

export interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
  published: string;
  userId: string;
  categoriaId: number;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  categoria: Category;
  postHasImage: PostHasImage[];
}
