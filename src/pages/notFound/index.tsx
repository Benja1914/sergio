import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full  text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Oops!
        </h1>
        <p className="text-3xl font-medium mb-12">
          Page not Found
        </p>
        
        <Link href="/">
          <button className="bg-[#20315D] hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}