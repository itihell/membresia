export const revalidate = 60;

import { getPaginatedPost } from "@/actions";
import { PostGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const { posts, currentPage, totalPages } = await getPaginatedPost({ page });

  //console.log(JSON.stringify(posts, null, 2));
  

  return (
    <>
      <Title title="Home" subtitle="Página principal" className="mb-2" />
      <PostGrid posts={posts} />
    </>
  );
}
