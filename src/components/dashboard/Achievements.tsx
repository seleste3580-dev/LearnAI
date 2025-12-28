import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Trophy, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const achievements = [
  { name: "First Steps", icon: Star },
  { name: "Quick Learner", icon: Zap },
  { name: "Pathfinder", icon: Award },
  { name: "Mastery", icon: Trophy },
];

export default function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
            <div className="grid grid-cols-4 gap-4">
            {achievements.map((ach, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/50 text-accent">
                                <ach.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{ach.name}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
            </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
