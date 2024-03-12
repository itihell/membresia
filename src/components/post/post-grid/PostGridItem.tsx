"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/interfaces";
import { formatDate, formatDateTime } from "@/utils";

interface Props {
  post: Post;
}

export const PostGridItem = ({ post }: Props) => {
  const [displayImage, setDisplayImage] = useState(post.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/post/${post.slug}`}>
        <Image
          src={`/post/${displayImage}`}
          alt={post.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(post.images[1])}
          onMouseLeave={() => setDisplayImage(post.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/post/${post.slug}`}>
          {post.title}
        </Link>
        <p>{post.content}</p>

        <span className="font-bold">
          {formatDateTime(post.createdAt.toISOString())}
        </span>
      </div>
    </div>
  );
};
