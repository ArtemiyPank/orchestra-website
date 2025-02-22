"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex space-x-6">
        {['about', 'programs', 'alumni'].map((page) => (
          <Link
            key={page}
            href={`/${page}`}
            className={`text-lg font-semibold transition ${
              pathname === `/${page}` ? 'text-primary-color underline' : 'text-gray-700'
            } hover:text-primary-color`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </Link>
        ))}
      </div>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;
