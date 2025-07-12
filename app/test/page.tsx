import RedirectButton from '@/components/RedirectButton';
import { DIRECTION } from '@/types/Direction';
import Link from 'next/link';

export default function Test() {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0">
      <RedirectButton
        href="/"
        direction={DIRECTION.BACK}
        label="Home Page"
        className="absolute top-4 left-4"
      />
      <h1 className="text-3xl font-bold">Test</h1>
      <ol className="w-full list-inside list-decimal space-y-4 rounded-lg bg-white p-6 text-left shadow-lg sm:w-2/3 md:w-1/2">
        <li>
          <Link href="/test/state-management">State Management</Link>
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
