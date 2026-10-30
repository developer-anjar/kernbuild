import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectCategory } from '../../models/project.model';
import { PROJECTS_DATA } from '../../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly allProjects = signal<Project[]>(PROJECTS_DATA);
  private readonly activeCategory = signal<ProjectCategory | 'All'>('All');
  private readonly searchQuery = signal('');

  readonly projects = computed(() => {
    let results = this.allProjects();
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'All') {
      results = results.filter(p => p.category === cat);
    }
    if (query) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }
    return results;
  });

  readonly featuredProjects = computed(() =>
    this.allProjects().filter(p => p.featured)
  );

  readonly category = this.activeCategory.asReadonly();
  readonly search = this.searchQuery.asReadonly();

  setCategory(category: ProjectCategory | 'All'): void {
    this.activeCategory.set(category);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
