/* eslint-disable @next/next/no-img-element */

export default async function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="/icons/logo.svg" alt="Loading..." className="w-152 h-152" />
      <h1 className="font-bold text-4xl text-green-700">Loading...</h1>
    </div>
  );
}
