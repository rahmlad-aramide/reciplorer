"use client";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex h-full w-full flex-col items-center justify-center bg-gray-50">
          <div className="flex h-full flex-col items-center justify-center rounded-lg p-4">
            <div className="mb-4">
              <span className="w-20 h-auto text-gray-400">☹️</span>
            </div>
            <h1 className="mb-4 text-center text-5xl font-bold text-gray-800">
              Oops!
            </h1>
            <p className="mb-8 flex flex-col text-center text-gray-600 md:mx-auto md:max-w-lg">
              <strong>
                An error has occured{" "}
                {error.message ? "with the error message:" : null}
              </strong>{" "}
              {error.message}
            </p>
            <div className="flex space-x-4">
              <Link href="/">
                <button className="bg-secondary hover:bg-secondary/80 rounded-md px-5 py-2 text-sm text-white transition-colors">
                  Go Home
                </button>
              </Link>
              <button
                className="bg-secondary hover:bg-secondary/80 rounded-md px-5 py-2 text-sm text-white transition-colors"
                onClick={() => reset()}
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
