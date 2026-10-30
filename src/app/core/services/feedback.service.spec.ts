import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
  });

  it('does not report success when the backend is unavailable', () => {
    const service = TestBed.inject(FeedbackService);
    let succeeded = false;
    let failed = false;

    service.submit({
      fullName: 'Test Client',
      email: 'test@example.com',
      projectType: 'Web application',
      overallExperience: 5,
      communicationQuality: 5,
      workQuality: 5,
      wouldRecommend: true,
      feedbackMessage: 'The project experience was clear and helpful.',
      privacyConsent: true,
    }).subscribe({
      next: () => { succeeded = true; },
      error: () => { failed = true; },
    });

    expect(succeeded).toBeFalse();
    expect(failed).toBeTrue();
    expect(service.submitted()).toBeFalse();
    expect(service.submitting()).toBeFalse();
    expect(service.error()).toContain('not connected');
  });
});
