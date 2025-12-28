import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/signup">
                Sign up
            </Link>
        </Button>
      </p>
    </div>
  );
}
