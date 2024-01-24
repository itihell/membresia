"use client";
import { PageNotFound } from "@/components";
import Link from "next/link";

export default function errorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="flex text-center content-center justify-center items-center">
        <span className="text-2xl">ERROR: </span>
        <span className="ml-2">{JSON.stringify(error.message)}</span>
      </div>
      <PageNotFound />
    </>
  );
}
