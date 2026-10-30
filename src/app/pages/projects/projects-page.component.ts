import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { ProjectService } from '../../core/services/project.service';
import { PROJECT_CATEGORIES, ProjectCategory } from '../../models/project.model';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  readonly categories: ProjectCategory[] = PROJECT_CATEGORIES;

  constructor(readonly projectService: ProjectService) {}

  setSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.projectService.setSearch(event.target.value);
    }
  }

  setCategory(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      this.projectService.setCategory(event.target.value as ProjectCategory | 'All');
    }
  }
}
