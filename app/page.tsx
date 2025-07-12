import RedirectButton from '@/components/RedirectButton';
import { DIRECTION } from '@/types/Direction';

export default function Home() {
  return (
    <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-0">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl md:whitespace-nowrap">
        Welcome to the Test Next App
      </h1>
      <p className="text-slate-500 sm:text-lg md:text-xl md:whitespace-nowrap">
        This is a simple Next.js application, intended for technical tests of frontend capabilities.
      </p>
      <RedirectButton href="/test" direction={DIRECTION.FORWARD} label="Test Page" />
    </div>
  );
}
