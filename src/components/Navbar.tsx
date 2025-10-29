"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Music, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThemeToggle } from "./ThemeToggle"

const Navbar = () => {
  const { t, i18n, ready } = useTranslation('navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (!ready) {
    return null;
  }

  const isRTL = i18n.language === 'he';
  
  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/vocal-group", label: t("vocalGroup") },
    { href: "/performances", label: t("performances") },
    // { href: "/alumni", label: t("alumni") },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background border-b sticky top-0 z-50"
    >
      <div className="container mx-auto px-2 sm:px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden md:block">Atid Raziel</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className={cn(
            "hidden md:flex gap-8 items-center",
            isRTL ? "flex-row-reverse" : ""
          )}>
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Theme Toggle and Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t mt-3"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-foreground/80 hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
