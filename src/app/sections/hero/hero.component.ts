import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { HeroSceneComponent } from '../../shared/hero-scene/hero-scene.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, HeroSceneComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly config = SITE_CONFIG;
}
