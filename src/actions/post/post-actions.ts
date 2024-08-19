"use server";

import prisma from "@/lib/prisma";

export const getPaginatedPost = async ({ page = 1, take = 12 }) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const posts = await prisma.post.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        PostHasImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        category: true,
        user: true,
      },
    });

    const totalCount = await prisma.post.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      posts: posts.map((post) => {
        return {
          ...post,
          images: post.PostHasImage.map((image) => image.url),
        };
      }),
    };
  } catch (error) {
    throw new Error("No se pudo cargar el listado de post");
  }
};
