import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { ContactInquiry } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  readonly inquiry: ContactInquiry = {
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyConsent: false,
  };

  constructor(readonly contactService: ContactService) {}

  submit(form: NgForm): void {
    if (form.invalid || this.contactService.submitting()) {
      form.control.markAllAsTouched();
      return;
    }

    this.contactService.submit(this.inquiry).subscribe({
      error: () => {
        if (!this.contactService.error()) {
          this.contactService.error.set('Unable to send your message. Please try again later.');
        }
      },
    });
  }
}
