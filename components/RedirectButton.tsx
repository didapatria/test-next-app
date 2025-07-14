'use client';

import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Direction, DIRECTION } from '@/types/Direction';
import { useStore } from '@/store/useStore';
import { THEME } from '@/types/Theme';

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
  const { theme } = useStore.themeStore.theme();

  return (
    <Link
      href={href}
      className={`flex flex-row-reverse items-center rounded-full shadow-md transition duration-500 ease-in-out hover:flex-row hover:bg-gradient-to-r ${
        theme === THEME.DARK
          ? `bg-gray-800 text-gray-100 ${
              direction === DIRECTION.BACK
                ? 'hover:from-gray-900 hover:to-transparent'
                : 'hover:from-transparent hover:to-gray-900'
            } hover:text-gray-200`
          : `bg-gray-400 text-white ${
              direction === DIRECTION.BACK
                ? 'hover:from-gray-500 hover:to-transparent'
                : 'hover:from-transparent hover:to-gray-500'
            } hover:text-white`
      } ${className}`}
    >
      {direction === DIRECTION.BACK && (
        <div className={`rounded-full p-2 ${theme === THEME.DARK ? 'bg-gray-800' : 'bg-gray-400'}`}>
          <FaChevronLeft />
        </div>
      )}
      <span className="mx-2">
        {`${direction === DIRECTION.BACK ? 'Back' : 'Go'} ${label ? ` to ${label}` : ''}`}
      </span>
      {direction === DIRECTION.FORWARD && (
        <div className={`rounded-full p-2 ${theme === THEME.DARK ? 'bg-gray-800' : 'bg-gray-400'}`}>
          <FaChevronRight />
        </div>
      )}
    </Link>
  );
}
