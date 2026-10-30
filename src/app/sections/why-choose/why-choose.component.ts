import { Component } from '@angular/core';
import { WHY_CHOOSE_DATA } from '../../data/why-choose.data';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  templateUrl: './why-choose.component.html',
  styleUrl: './why-choose.component.scss',
})
export class WhyChooseComponent {
  readonly reasons = WHY_CHOOSE_DATA;
}
