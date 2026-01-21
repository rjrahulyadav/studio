'use server';
/**
 * @fileOverview An AI-powered chatbot for DhaniHya Solutions to answer visitor questions.
 *
 * - supportChatbot - A function that handles the chatbot interaction.
 * - SupportChatbotInput - The input type for the supportChatbot function.
 * - SupportChatbotOutput - The return type for the supportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportChatbotInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
});
export type SupportChatbotInput = z.infer<typeof SupportChatbotInputSchema>;

const SupportChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot answer to the user query.'),
});
export type SupportChatbotOutput = z.infer<typeof SupportChatbotOutputSchema>;

export async function supportChatbot(input: SupportChatbotInput): Promise<SupportChatbotOutput> {
  return supportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportChatbotPrompt',
  input: {schema: SupportChatbotInputSchema},
  output: {schema: SupportChatbotOutputSchema},
  prompt: `You are a chatbot for DhaniHya Solutions, an IT company specializing in real-time projects, AI development, IoT solutions, web and mobile app development, software consulting, and research & innovation.
  Use the following context to answer the user's question.

  Context:
  DhaniHya Solutions Pvt Ltd is an Information Technology company led by Director Dr. K.C Rajheshwari. They offer Real-Time Projects & Industrial Training, Problem Solving & Technical Mentorship, Artificial Intelligence Development, Internet of Things (IoT) Solutions, Web & Mobile App Development, Software Consulting, and Research & Innovation Support.

  Question: {{{query}}}

  Answer:`,
});

const supportChatbotFlow = ai.defineFlow(
  {
    name: 'supportChatbotFlow',
    inputSchema: SupportChatbotInputSchema,
    outputSchema: SupportChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
