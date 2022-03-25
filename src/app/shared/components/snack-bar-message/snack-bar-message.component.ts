import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
  styleUrls: ['./snack-bar-message.component.scss'],
})
export class SnackBarMessageComponent implements OnInit {
  constructor(
    private readonly snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  success(pMessage: string): void {
    this.snackbar.openFromComponent(SnackBarMessageComponent, {
      data: {
        message: pMessage,
        snackType: 'Success',
      },
      panelClass: 'snackbar-success',
    });
  }

  error(pMessage: string): void {
    this.snackbar.openFromComponent(SnackBarMessageComponent, {
      data: {
        message: pMessage,
        snackType: 'Error',
      },
      panelClass: 'snackbar-alert',
    });
  }

  warning(pMessage: string): void {
    this.snackbar.openFromComponent(SnackBarMessageComponent, {
      data: {
        message: pMessage,
        snackType: 'Warn',
      },
      panelClass: 'snackbar-warning',
    });
  }

  info(pMessage: string): void {
    this.snackbar.openFromComponent(SnackBarMessageComponent, {
      data: {
        message: pMessage,
        snackType: 'Info',
      },
      panelClass: 'snackbar-info',
    });
  }

  get getIcon(): string {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
    }
  }
}
