import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};