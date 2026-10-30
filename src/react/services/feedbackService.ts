import { environment } from '../config/environment';
import type { Feedback } from '../types/feedback';

export async function submitFeedback(feedback: Feedback): Promise<void> {
  if (!environment.backendAvailable) throw new Error('Feedback API is not configured.');
  const response = await fetch(`${environment.apiBaseUrl}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) throw new Error('The feedback API request failed.');
}
