import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  DlnButton,
  DlnCheckbox,
  DlnInput,
  DlnRadioButton,
  DlnRadioGroup,
  DlnSelect,
  DlnTextarea,
} from 'deline-core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DlnInput,
    KeyValuePipe,
    DlnButton,
    DlnCheckbox,
    DlnSelect,
    DlnTextarea,
    DlnRadioButton,
    DlnRadioGroup,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected form: FormGroup;
  protected loading = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      accept: [false, Validators.requiredTrue],
      country: ['', Validators.required],
      description: ['', Validators.required],
      gender: ['male', Validators.required],
    });
  }

  protected errorMessages: Partial<Record<string, (error: any) => string>> = {
    required: () => 'El campo es obligatorio',
    email: () => 'Email inválido',
    minlength: (error) => `La contraseña debe tener al menos ${error.requiredLength} caracteres`,
  };

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      console.log('Enviando...', this.form.value);

      setTimeout(() => {
        this.loading = false;
        console.log('✅ Form enviado:', this.form.value);
      }, 2000);
    }
  }
}
