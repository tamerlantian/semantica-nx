import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminos-uso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terminos-uso.component.html',
  styleUrl: './terminos-uso.component.scss',
})
export class TerminosUsoComponent {
  readonly currentYear = new Date().getFullYear();
}
