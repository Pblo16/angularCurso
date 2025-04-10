import { HttpClient } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient) {
    this.formUsuario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  guardar() {
    if (this.formUsuario.valid) {
      console.log('Guardando...', this.formUsuario.value);

      const body: Omit<IDataTable, 'id'> = {
        name: this.formUsuario.value.name,
        email: this.formUsuario.value.email,
        password: this.formUsuario.value.password
      };

      this.httpClient.post<IDataTable>('http://localhost:3000/api/users/', body)
        .subscribe({
          next: (response) => {
            console.log('Usuario guardado correctamente:', response);
            this.formUsuario.reset();
          },
          error: (error) => {
            console.error('Error al guardar el usuario:', error);
          }
        });
    } else {
      console.log('Formulario inválido');
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.formUsuario.controls).forEach(key => {
        this.formUsuario.get(key)?.markAsTouched();
      });
    }
  }
}
