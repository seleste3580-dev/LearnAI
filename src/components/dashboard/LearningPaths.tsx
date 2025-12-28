import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const paths = [
  {
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning.",
    progress: 75,
    image: PlaceHolderImages.find(img => img.id === 'learning-path-thumb-1'),
  },
  {
    title: "Modern Web Development",
    description: "Build responsive, full-stack applications with React and Node.js.",
    progress: 40,
    image: PlaceHolderImages.find(img => img.id === 'learning-path-thumb-2'),
  },
  {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and models.",
    progress: 15,
    image: PlaceHolderImages.find(img => img.id === 'learning-path-thumb-3'),
  },
];

export default function LearningPaths() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Learning Paths</CardTitle>
        <CardDescription>Continue your journey and master new skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center gap-4 group">
            {path.image && (
              <Image
                src={path.image.imageUrl}
                alt={path.image.description}
                width={100}
                height={75}
                className="rounded-md object-cover aspect-[4/3]"
                data-ai-hint={path.image.imageHint}
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{path.title}</h4>
              <p className="text-sm text-muted-foreground">{path.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={path.progress} className="w-full h-2" />
                <span className="text-sm font-medium text-muted-foreground">{path.progress}%</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                <Link href="#"><ArrowRight className="w-4 h-4"/></Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
