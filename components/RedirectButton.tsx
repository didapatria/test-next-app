import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Direction, DIRECTION } from '../types/Direction';

interface RedirectButtonProps {
  href: string;
  direction: Direction;
  label?: string;
  className?: string;
}

export default function RedirectButton({
  href,
  direction,
  label,
  className = '',
}: RedirectButtonProps) {
  return (
    <Link
      href={href}
      className={`flex flex-row-reverse items-center rounded-full bg-slate-500 text-slate-100 transition duration-500 ease-in-out hover:flex-row hover:bg-gradient-to-r ${direction === DIRECTION.BACK ? 'hover:from-slate-700 hover:to-transparent' : 'hover:from-transparent hover:to-slate-700'} hover:text-slate-200 ${className}`}
    >
      {direction === DIRECTION.BACK && (
        <div className="rounded-full bg-slate-500 p-2">
          <FaChevronLeft />
        </div>
      )}
      <span className="mx-2">
        {direction === DIRECTION.BACK ? 'Back' : 'Go'} to {label}
      </span>
      {direction === DIRECTION.FORWARD && (
        <div className="rounded-full bg-slate-500 p-2">
          <FaChevronRight />
        </div>
      )}
    </Link>
  );
}
