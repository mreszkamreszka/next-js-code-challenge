import { Link } from '@/core/navigation/navigation';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <p className="mb-1 text-6xl font-light text-slate-300 tabular-nums">
        404
      </p>
      <p className="mb-8 text-slate-600">Pokémon not found</p>
      <Link
        href="/"
        className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
      >
        Back to Pokémon
      </Link>
    </div>
  );
}
