import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/login">
                Log in
            </Link>
        </Button>
      </p>
    </div>
  );
}
