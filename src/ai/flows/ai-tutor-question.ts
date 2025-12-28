'use server';

/**
 * @fileOverview AI Tutor flow that answers user questions with detailed explanations, examples, action steps, and confidence levels.
 *
 * - aiTutorQuestion - A function that takes a user's question and returns a detailed answer from the AI tutor.
 * - AITutorQuestionInput - The input type for the aiTutorQuestion function.
 * - AITutorQuestionOutput - The return type for the aiTutorQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AITutorQuestionInputSchema = z.object({
  question: z.string().describe('The user\u0027s question.'),
});
export type AITutorQuestionInput = z.infer<typeof AITutorQuestionInputSchema>;

const AITutorQuestionOutputSchema = z.object({
  answer: z.string().describe('The detailed answer from the AI tutor.'),
  confidenceLevel: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'The confidence level of the AI in the answer, ranging from 0 to 1.'
    ),
  examples: z.array(z.string()).describe('Examples to illustrate the answer.'),
  actionSteps: z.array(z.string()).describe('Action steps for the user.'),
});
export type AITutorQuestionOutput = z.infer<typeof AITutorQuestionOutputSchema>;

export async function aiTutorQuestion(input: AITutorQuestionInput): Promise<AITutorQuestionOutput> {
  return aiTutorQuestionFlow(input);
}

const aiTutorQuestionPrompt = ai.definePrompt({
  name: 'aiTutorQuestionPrompt',
  input: {schema: AITutorQuestionInputSchema},
  output: {schema: AITutorQuestionOutputSchema},
  prompt: `You are an AI tutor who answers user questions in detail, providing examples and action steps. Also provide confidence levels.

  Question: {{{question}}}

  Confidence Level Instructions: The confidenceLevel should reflect how sure you are in the accuracy of your answer. It should be a number between 0 and 1, where 0 means you have no confidence and 1 means you are absolutely certain. Justify the level of confidence.

  Output in JSON format.
  `, 
});

const aiTutorQuestionFlow = ai.defineFlow(
  {
    name: 'aiTutorQuestionFlow',
    inputSchema: AITutorQuestionInputSchema,
    outputSchema: AITutorQuestionOutputSchema,
  },
  async input => {
    const {output} = await aiTutorQuestionPrompt(input);
    return output!;
  }
);
