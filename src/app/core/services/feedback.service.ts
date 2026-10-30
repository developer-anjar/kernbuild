import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Feedback } from '../../models/feedback.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  submit(feedback: Feedback): Observable<void> {
    this.submitting.set(true);
    this.error.set(null);

    if (!environment.backendAvailable) {
      this.submitting.set(false);
      this.error.set('The feedback form is not connected yet. Your feedback was not sent.');
      return throwError(() => new Error('Feedback API is not configured.'));
    }

    return this.http.post<void>(`${environment.apiBaseUrl}/feedback`, feedback).pipe(
      tap(() => {
        this.submitted.set(true);
      }),
      catchError(err => {
        this.error.set('Failed to submit feedback. Please check your connection and try again.');
        return throwError(() => err);
      }),
      finalize(() => this.submitting.set(false))
    );
  }

  reset(): void {
    this.submitted.set(false);
    this.error.set(null);
  }
}
