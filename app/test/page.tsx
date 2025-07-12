import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';

export default function Test() {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0">
      <Link
        href="/"
        className="absolute top-4 left-4 flex flex-row-reverse items-center rounded-full bg-slate-500 text-slate-100 transition duration-500 ease-in-out hover:flex-row hover:bg-gradient-to-r hover:from-slate-700 hover:to-transparent hover:text-slate-200"
      >
        <div className="rounded-full bg-slate-500 p-2">
          <FaChevronLeft />
        </div>
        <span className="mx-2">Back to Home Page</span>
      </Link>
      <h1 className="text-3xl font-bold">Test</h1>
      <ol className="w-full list-inside list-decimal space-y-4 rounded-lg bg-white p-4 text-left shadow-lg sm:w-2/3 md:w-1/2">
        <li>
          <Link href="/test/test1">Test 1</Link>
        </li>
        <li>
          <Link href="/test/test2">Test 2</Link>
        </li>
        <li>
          <Link href="/test/test3">Test 3</Link>
        </li>
      </ol>
    </div>
  );
}
