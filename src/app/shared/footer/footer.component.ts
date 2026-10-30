import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly config = SITE_CONFIG;
  readonly businessEmail = environment.businessEmail.trim();

  readonly navLinks = [
    { label: 'Home', fragment: 'home' },
    { label: 'About', fragment: 'about' },
    { label: 'Services', fragment: 'services' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Process', fragment: 'process' },
    { label: 'Contact', fragment: 'contact' },
  ];

  readonly serviceLinks = [
    'Web Applications',
    'Full-Stack Development',
    'AI Integration',
    'Dashboards',
    'Deployment',
  ];

  readonly socialLinks = [
    { name: 'LinkedIn', icon: 'in', url: SITE_CONFIG.socialLinks.linkedin },
    { name: 'GitHub', icon: 'gh', url: SITE_CONFIG.socialLinks.github },
    { name: 'Instagram', icon: 'ig', url: SITE_CONFIG.socialLinks.instagram },
  ];

  get visibleSocials() {
    return this.socialLinks.filter(s => !!s.url);
  }

}
