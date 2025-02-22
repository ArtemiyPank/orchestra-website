"use client"; // Обязательно для компонентов, использующих хуки next/navigation

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/about" className={`text-lg font-semibold hover:text-gray-500 ${pathname === '/about' ? 'text-blue-500' : ''}`}>
          About Orchestra
        </Link>
        <Link href="/programs" className={`text-lg font-semibold hover:text-gray-500 ${pathname === '/programs' ? 'text-blue-500' : ''}`}>
          Orchestra Programs
        </Link>
        <Link href="/alumni" className={`text-lg font-semibold hover:text-gray-500 ${pathname === '/alumni' ? 'text-blue-500' : ''}`}>
          Alumni Interviews
        </Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;
