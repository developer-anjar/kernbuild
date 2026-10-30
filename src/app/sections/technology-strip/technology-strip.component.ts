import { Component } from '@angular/core';
import { TECHNOLOGIES_DATA } from '../../data/technologies.data';

@Component({
  selector: 'app-technology-strip',
  standalone: true,
  templateUrl: './technology-strip.component.html',
  styleUrl: './technology-strip.component.scss',
})
export class TechnologyStripComponent {
  readonly technologies = TECHNOLOGIES_DATA;
}
