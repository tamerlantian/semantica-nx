import { Component } from '@angular/core';
import { PageHeaderComponent, EmptyStateComponent } from '../../../../shared';

@Component({
  selector: 'app-creditos-list',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent],
  templateUrl: './creditos-list.component.html',
  styleUrl: './creditos-list.component.scss',
})
export class CreditosListComponent {}
