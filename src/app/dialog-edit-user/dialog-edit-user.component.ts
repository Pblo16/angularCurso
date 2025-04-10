import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../usuario.service';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
}

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.css'
})
export class DialogEditUserComponent implements OnInit {
  editForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    // Load user data when component initializes
    this.usuarioService.getUsuario(this.data.userId).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          name: user.name,
          email: user.email
        });
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar datos del usuario';
        console.error('Error fetching user:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.editForm.valid) {
      const userData = {
        name: this.editForm.value.name,
        email: this.editForm.value.email
      };

      this.usuarioService.updateUsuario(this.data.userId, userData).subscribe({
        next: () => {
          this.dialogRef.close(true); // true indicates successful update
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el usuario';
          console.error('Error updating user:', error);
        }
      });
    } else {
      // Mark form controls as touched to show validation errors
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.get(key)?.markAsTouched();
      });
    }
  }
}
