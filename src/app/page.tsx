import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, BrainCircuit, LineChart } from 'lucide-react';
import Logo from '@/components/layout/Logo';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: 'AI Tutor & Mentor',
    description: 'Get instant, detailed answers to your toughest questions across any subject, from coding to career advice.',
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'Personalized Learning',
    description: 'Our AI analyzes your progress to create custom learning paths with lessons and resources tailored just for you.',
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: 'Professional Growth',
    description: 'Track your achievements, earn certificates, and visualize your skill development on your personal dashboard.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
             />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
              Unlock Your Potential with LearnAI
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Your personal AI-powered learning and mentoring platform. Get expert guidance, personalized learning paths, and career advice.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                A Smarter Way to Learn
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                LearnAI provides the tools you need to accelerate your growth and achieve your goals.
              </p>
            </div>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} LearnAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
