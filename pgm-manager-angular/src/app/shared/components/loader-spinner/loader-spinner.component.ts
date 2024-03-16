import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss',
})
export class LoaderSpinnerComponent {}
