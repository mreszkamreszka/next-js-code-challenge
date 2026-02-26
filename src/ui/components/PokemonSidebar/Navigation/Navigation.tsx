'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link,usePathname  } from '@/core/navigation/navigation';
import FavSVG from '@/public/assets/fav.svg';
import MainSVG from '@/public/assets/main.svg';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const navLinks = [
    { name: 'homepage', text: t('btnPokemon'), href: '/', icon: MainSVG },
    {
      name: 'favorites',
      text: t('btnFavorites'),
      href: '/favorites',
      icon: FavSVG,
    },
  ];

  return (
    <nav className="space-y-4">
      {navLinks.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 transition ${
              pathname === link.href
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-slate-100'
            }`}
          >
            <Image
              src={link.icon}
              alt="icon"
              width={20}
              height={20}
              className={`h-5 w-5 ${pathname === link.href ? 'invert' : ''} `}
            />
            <span className="font-medium">{link.text}</span>
          </Link>
        ))}
    </nav>
  );
}
