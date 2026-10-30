import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeedbackService } from '../../core/services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  readonly feedback: Feedback = {
    fullName: '',
    email: '',
    projectType: '',
    overallExperience: 0,
    communicationQuality: 0,
    workQuality: 0,
    wouldRecommend: null,
    feedbackMessage: '',
    suggestion: '',
    privacyConsent: false,
  };

  constructor(readonly feedbackService: FeedbackService) {}

  submit(form: NgForm): void {
    if (form.invalid || this.feedbackService.submitting()) {
      form.control.markAllAsTouched();
      return;
    }

    this.feedbackService.submit(this.feedback).subscribe({
      error: () => {
        if (!this.feedbackService.error()) {
          this.feedbackService.error.set('Unable to submit your feedback. Please try again later.');
        }
      },
    });
  }
}
