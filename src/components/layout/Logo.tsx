import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline text-foreground", className)}>
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span>LearnAI</span>
    </Link>
  );
}
