import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ScreenSizeDirective } from './shared/directives/screen-size.directive';
import { ScreenSizeSignal } from './shared/signals/screen-size.signal';
import { SideBarSignal } from './shared/signals/sidebar.signal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatSidenavModule,
    ScreenSizeDirective,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pgm atendimento';

  showFiller = false;
  sidebarSignal = inject(SideBarSignal);
  screenSignal = inject(ScreenSizeSignal);
  currentScreen = '';
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggle() {
    this.sidenav.toggle().then();
  }
  computeSize(size: string) {
    this.currentScreen = size;
  }
}
