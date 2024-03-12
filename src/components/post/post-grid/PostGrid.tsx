import { Product } from "@/interfaces";
import { PostGridItem } from "./PostGridItem";
import { Post } from "@prisma/client";

interface Props {
  posts: Post[];
}

export const PostGrid = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {posts.map((post) => (
        <PostGridItem key={post.slug} post={post} />
      ))}
    </div>
  );
};
