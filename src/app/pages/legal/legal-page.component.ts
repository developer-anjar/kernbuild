import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface LegalSection {
  title: string;
  body: string;
}

interface LegalPage {
  heading: string;
  introduction: string;
  sections: LegalSection[];
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss',
})
export class LegalPageComponent {
  readonly page = inject(ActivatedRoute).snapshot.data as LegalPage;
}
