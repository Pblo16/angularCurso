import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from './usuario.service';
import { Subscription } from 'rxjs';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { MatDialog } from '@angular/material/dialog';

export interface IDataTable {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTableModule, CommonModule, DialogUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  dataSource: IDataTable[] = [];
  readonly dialog = inject(MatDialog);

  private subscription = new Subscription();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Lo que este aquí va ser lo primero en ejecutarse al llamar el componente
    this.subscription.add(
      this.usuarioService.getUsuarios().subscribe({
        next: (data) => {
          this.dataSource = data;
          console.log(this.dataSource);
        },
        error: (error) => {
          console.error('Error obteniendo usuarios:', error);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    // Limpiamos las suscripciones para evitar memory leaks
    this.subscription.unsubscribe();
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'created_at',
    'updated_at',
  ];
  // dataSource = ELEMENT_DATA;
  title = 'angularCurso';

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
