import { Component } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInput],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
