import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
  });

  it('does not report success when email delivery is not configured', () => {
    const service = TestBed.inject(ContactService);
    let succeeded = false;
    let failed = false;

    service.submit({
      name: 'Test Client',
      email: 'test@example.com',
      subject: 'Project inquiry',
      message: 'A project description long enough for validation.',
      privacyConsent: true,
    }).subscribe({
      next: () => { succeeded = true; },
      error: () => { failed = true; },
    });

    expect(succeeded).toBeFalse();
    expect(failed).toBeTrue();
    expect(service.submitted()).toBeFalse();
    expect(service.submitting()).toBeFalse();
    expect(service.error()).toContain('not configured');
  });
});
