import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ENVIRONMENT } from '@semantica/core';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputText, Textarea, ButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);

  readonly currentYear = new Date().getFullYear();
  readonly whatsappPhone = this.env.whatsappPhone;
  readonly whatsappUrl = `https://wa.me/57${this.env.whatsappPhone}`;
  readonly contactSending = signal(false);
  readonly contactSent = signal(false);

  readonly contactForm = this.fb.nonNullable.group({
    nombre: ['', Validators.maxLength(200)],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.maxLength(50)]],
    empresa: [''],
    descripcion: [''],
  });

  readonly faqItems: FaqItem[] = [
    {
      question: '¿Qué es el portal de empleados de Semantica?',
      answer:
        'Es una plataforma centralizada donde puedes consultar tu nómina, descargar certificaciones, gestionar vacaciones, revisar tu seguridad social y acceder a otros servicios laborales desde un solo lugar.',
    },
    {
      question: '¿Cómo puedo acceder al portal?',
      answer:
        'Primero debes registrarte en la plataforma utilizando el mismo correo electrónico que tienes registrado en tu empresa. Una vez inicies sesión, deberás asociar la empresa donde estás laborando. Esta información te la proporcionará el departamento de gestión humana.',
    },
    {
      question: '¿Qué hago si olvidé mi contraseña?',
      answer:
        'En la pantalla de inicio de sesión encontrarás la opción "¿Olvidaste tu contraseña?". Sigue las instrucciones para restablecerla a través de tu correo electrónico registrado.',
    },
    {
      question: '¿Puedo acceder desde mi celular?',
      answer:
        'Sí, el portal cuenta con un diseño responsive que se adapta a cualquier dispositivo. No necesitas instalar ninguna aplicación, solo ingresa desde el navegador de tu celular o tablet.',
    },
    {
      question: '¿Con quién me comunico si tengo problemas técnicos?',
      answer:
        'Puedes escribir a soporte@semantica.com.co o comunicarte directamente con el área de recursos humanos de tu empresa para recibir asistencia.',
    },
    {
      question: '¿Qué información puedo consultar en el portal?',
      answer:
        'Puedes consultar tu nómina detallada, descargar certificaciones laborales, revisar el estado de tus vacaciones, consultar seguridad social, ver la programación de turnos y acceder a capacitaciones en línea.',
    },
  ];

  readonly openIndex = signal<number | null>(null);

  get correoControl() {
    return this.contactForm.controls.correo;
  }

  get telefonoControl() {
    return this.contactForm.controls.telefono;
  }

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactSending.set(true);

    const payload = {
      ...this.contactForm.getRawValue(),
      codigoProyecto: 11,
    };

    this.http.post('https://semantica.com.co/api/contacto/nuevo', payload).subscribe({
      next: () => {
        this.contactSending.set(false);
        this.contactSent.set(true);
        this.contactForm.reset();
      },
      error: () => {
        this.contactSending.set(false);
      },
    });
  }
}
