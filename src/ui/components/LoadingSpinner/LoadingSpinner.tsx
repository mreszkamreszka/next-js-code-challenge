import { Loader2 } from 'lucide-react';
import cn from '@/ui/utils/cn';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export default function LoadingSpinner({
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      aria-hidden
      className={cn(
        'animate-spin text-slate-500 dark:text-slate-400',
        sizeClasses[size],
        className,
      )}
    />
  );
}
