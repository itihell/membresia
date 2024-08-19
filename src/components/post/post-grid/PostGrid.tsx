import { Post } from "@prisma/client";

interface Props {
  posts: Post[];
}

export const PostGrid = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {posts.map((post) => (
        <span key={post.slug}>{post.title}</span>
      ))}
    </div>
  );
};
