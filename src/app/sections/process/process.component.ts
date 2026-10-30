import { Component } from '@angular/core';
import { PROCESS_DATA } from '../../data/process.data';

@Component({
  selector: 'app-process',
  standalone: true,
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  readonly steps = PROCESS_DATA;
}
