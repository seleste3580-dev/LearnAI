"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, ListChecks, CheckCircle } from "lucide-react";
import type { AITutorQuestionOutput } from "@/ai/flows/ai-tutor-question";

type TutorResponseProps = {
  response: AITutorQuestionOutput;
};

export function TutorResponse({ response }: TutorResponseProps) {
  const confidencePercent = response.confidenceLevel * 100;
  
  return (
    <Card className="border-primary/20 bg-background">
      <CardContent className="p-4 space-y-4">
        <p className="whitespace-pre-wrap">{response.answer}</p>
        
        <div>
          <label className="text-sm font-medium">Confidence</label>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={confidencePercent} className="h-2" />
            <span className="text-sm font-semibold">{confidencePercent.toFixed(0)}%</span>
          </div>
        </div>
        
        <Accordion type="multiple" className="w-full">
          {response.examples && response.examples.length > 0 && (
            <AccordionItem value="examples">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Examples
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {response.examples.map((example, index) => (
                  <pre key={index} className="bg-muted p-3 rounded-md text-sm overflow-x-auto"><code>{example}</code></pre>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {response.actionSteps && response.actionSteps.length > 0 && (
            <AccordionItem value="action-steps">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-green-500" />
                    Action Steps
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {response.actionSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
