'use client';

import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import PokemonSidebar from '@/ui/components/PokemonSidebar/PokemonSidebar';

type PageWithSidebarProps = {
  children: React.ReactNode;
};

export default function PageWithSidebar({ children }: PageWithSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeSidebar();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeSidebar]);

  return (
    <div className="relative mr-auto ml-auto flex min-h-screen w-full max-w-[1295px]">
      {/* Hamburger button - visible below md, hidden when sidebar is open */}
      <button
        type="button"
        className={`fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg md:hidden ${
          isSidebarOpen ? 'pointer-events-none invisible' : ''
        }`}
        aria-label="Toggle menu"
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen(prev => !prev)}
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* Overlay - when sidebar open on mobile */}
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-label="Close menu"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - hidden on mobile when closed, overlay when open */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[320px] transition-transform duration-300 md:relative md:z-auto md:translate-x-0 md:transition-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <PokemonSidebar onNavigate={closeSidebar} />
      </div>

      {/* Main content - extra padding on mobile to clear hamburger button */}
      <div className="flex-1 pt-4 pl-16 md:pt-0 md:pl-0">{children}</div>
    </div>
  );
}
