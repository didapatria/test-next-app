import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';

export default function Home() {
  return (
    <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl md:whitespace-nowrap">
        Welcome to the Test Next App
      </h1>
      <p className="text-slate-500 sm:text-lg md:text-xl md:whitespace-nowrap">
        This is a simple Next.js application, intended for technical tests of frontend capabilities.
      </p>
      <Link
        href="/test"
        className="flex flex-row-reverse items-center space-x-2 rounded-full bg-slate-500 text-slate-100 transition duration-500 ease-in-out hover:flex-row hover:bg-gradient-to-r hover:from-transparent hover:to-slate-700 hover:text-slate-200"
      >
        <span className="mx-2">Go to Test Page</span>
        <div className="rounded-full bg-slate-500 p-2">
          <FaChevronRight />
        </div>
      </Link>
    </div>
  );
}
