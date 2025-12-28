import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type WelcomeBannerProps = {
  userName: string;
};

export default function WelcomeBanner({ userName }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-headline">Welcome back, {userName}!</h2>
          <p className="mt-2 text-primary-foreground/80 max-w-2xl">
            Ready to tackle your next challenge? Ask a question or continue your learning path.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button variant="secondary" asChild>
            <Link href="/tutor">Ask the AI Tutor</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
