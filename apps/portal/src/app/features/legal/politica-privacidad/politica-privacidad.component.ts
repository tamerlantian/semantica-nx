import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.scss',
})
export class PoliticaPrivacidadComponent {
  readonly currentYear = new Date().getFullYear();
}
