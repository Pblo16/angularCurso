import {
  Component,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface IDataTable {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-dialog-user',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.css',
})
export class DialogUserComponent {
  public formUsuario: FormGroup;

  constructor() {
    this.formUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  guardar() {
    if (this.formUsuario.valid) {
      console.log('Guardando...', this.formUsuario.value);
      this.formUsuario.reset();
    } else {
      console.log('Formulario inválido');
    }
  }
}
