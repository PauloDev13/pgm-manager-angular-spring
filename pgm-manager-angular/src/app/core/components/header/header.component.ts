import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { SideBarSignal } from '../../../shared/signals/sidebar.signal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly sidebarSignal = inject(SideBarSignal);

  toggle() {
    this.sidebarSignal.sidebarOpen.update(val => !val);
  }
}
