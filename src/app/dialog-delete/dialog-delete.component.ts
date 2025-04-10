import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {
  isDeleting = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private usuarioService: UsuarioService
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.isDeleting = true;
    this.errorMessage = null;

    this.usuarioService.deleteUsuario(this.data.userId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.dialogRef.close(true); // true indicates successful deletion
      },
      error: (error) => {
        this.isDeleting = false;
        this.errorMessage = 'Error al eliminar el usuario. Por favor, inténtelo de nuevo.';
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }
}
