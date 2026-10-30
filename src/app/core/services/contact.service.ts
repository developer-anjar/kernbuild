import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, from, map, tap, throwError } from 'rxjs';
import { ContactInquiry } from '../../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  submit(inquiry: ContactInquiry): Observable<void> {
    if (this.submitting()) {
      return throwError(() => new Error('A contact request is already in progress.'));
    }

    this.submitting.set(true);
    this.error.set(null);
    this.submitted.set(false);

    const { publicKey, serviceId, templateId } = environment.emailJs;
    const emailJsConfigured = Boolean(publicKey.trim() && serviceId.trim() && templateId.trim());

    if (emailJsConfigured) {
      const request = from(
        import('@emailjs/browser').then(({ default: emailjs }) =>
          emailjs.send(serviceId, templateId, {
            from_name: inquiry.name,
            reply_to: inquiry.email,
            subject: inquiry.subject,
            message: inquiry.message,
          }, { publicKey })
        )
      ).pipe(
        map(response => {
          if (response.status !== 200) {
            throw new Error(`Email provider rejected the request with status ${response.status}.`);
          }
        }),
      );
      return this.finalizeSubmission(request);
    }

    if (environment.backendAvailable) {
      const request = this.http.post<{ accepted: boolean }>(`${environment.apiBaseUrl}/contact`, inquiry).pipe(
        map(response => {
          if (!response?.accepted) {
            throw new Error('The contact API did not accept the request.');
          }
        }),
      );
      return this.finalizeSubmission(request);
    }

    this.submitting.set(false);
    this.error.set('Email delivery is not configured yet. Your message was not sent.');
    return throwError(() => new Error('Configure EmailJS or the contact API before accepting submissions.'));
  }

  reset(): void {
    this.submitted.set(false);
    this.error.set(null);
  }

  private finalizeSubmission<T>(request: Observable<T>): Observable<void> {
    return request.pipe(
      map(() => undefined),
      tap(() => this.submitted.set(true)),
      catchError(error => {
        this.error.set('Failed to send your message. Please try again later.');
        return throwError(() => error);
      }),
      finalize(() => this.submitting.set(false)),
    );
  }
}
