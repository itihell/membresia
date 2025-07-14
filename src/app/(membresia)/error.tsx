"use client"; // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center content-center">
      <div className="mt-32">
        <h2 className="text-3xl">Algo salio mal 😢!</h2>
        <p className="mb-4">{error.message}</p>
        <button onClick={() => reset()}>Intenta nuevamente</button>
      </div>
    </div>
  );
}
