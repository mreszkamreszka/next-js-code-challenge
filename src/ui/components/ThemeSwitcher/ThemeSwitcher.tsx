'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/ui/contexts/ThemeContext';
import cn from '@/ui/utils/cn';

type ThemeSwitcherProps = {
  className?: string;
};

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      className={cn(
        'rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
        className,
      )}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon aria-hidden className="h-5 w-5" />
      ) : (
        <Sun aria-hidden className="h-5 w-5" />
      )}
    </button>
  );
}
