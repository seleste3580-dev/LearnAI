"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getTutorResponse } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TutorResponse } from './TutorResponse';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AITutorQuestionOutput } from '@/ai/flows/ai-tutor-question';

const formSchema = z.object({
  question: z.string().min(1, 'Please enter a question.'),
});
type FormValues = z.infer<typeof formSchema>;

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string | AITutorQuestionOutput;
};

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: data.question };
    setMessages(prev => [...prev, userMessage]);
    reset();

    const result = await getTutorResponse(data.question);

    if (result.success) {
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: result.data };
      setMessages(prev => [...prev, aiMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
      // Optionally remove the user's message if the API call fails
      setMessages(prev => prev.slice(0, prev.length -1));
    }

    setIsLoading(false);
  };

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground pt-16">
              <Bot className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium">How can I help you today?</p>
            </div>
          )}
          {messages.map(message => (
            <div key={message.id} className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback>{message.role === 'user' ? <User className="w-4 h-4"/> : <Bot className="w-4 h-4"/>}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {message.role === 'user' ? (
                  <p className="bg-muted rounded-lg p-3">{typeof message.content === 'string' ? message.content : ''}</p>
                ) : (
                  <TutorResponse response={message.content as AITutorQuestionOutput} />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback><Bot className="w-4 h-4"/></AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin"/>
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <CardContent className="p-4 border-t">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
          <Textarea
            {...register('question')}
            placeholder="e.g., Explain recursion in Python with an example."
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          <Button type="submit" disabled={isLoading} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        {errors.question && <p className="text-sm text-destructive mt-1">{errors.question.message}</p>}
      </CardContent>
    </Card>
  );
}
