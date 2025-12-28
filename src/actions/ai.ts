'use server';

import { aiTutorQuestion, AITutorQuestionOutput } from '@/ai/flows/ai-tutor-question';
import { summarizeDocument, SummarizeDocumentOutput } from '@/ai/flows/upload-document-for-summary';

export async function getTutorResponse(question: string): Promise<{ success: true; data: AITutorQuestionOutput } | { success: false; error: string }> {
  if (!question) {
    return { success: false, error: 'Question cannot be empty.' };
  }
  
  try {
    const response = await aiTutorQuestion({ question });
    return { success: true, data: response };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to get a response from the AI tutor. Please try again.' };
  }
}

export async function getSummaryForDocument(documentDataUri: string): Promise<{ success: true; data: SummarizeDocumentOutput } | { success: false; error: string }> {
  if (!documentDataUri) {
    return { success: false, error: 'Document data cannot be empty.' };
  }
  
  try {
    const response = await summarizeDocument({ documentDataUri });
    return { success: true, data: response };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to get a summary for the document. Please ensure the file format is supported and try again.' };
  }
}
