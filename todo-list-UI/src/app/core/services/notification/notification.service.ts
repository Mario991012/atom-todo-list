import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * `NotificationService` provides methods for displaying snack bar notifications 
 * for success, error, and informational messages.
 * It uses Angular Material's `MatSnackBar` to display messages at the top of the screen.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Constructs the `NotificationService` with `MatSnackBar` injected for displaying messages.
   * 
   * @param snackBar - The `MatSnackBar` service for displaying snack bar messages.
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Displays a success message using a snack bar.
   * The message is shown for 3000 milliseconds at the top of the screen.
   * 
   * @param message - The message to display.
   * 
   * @example
   * ```
   * this.notificationService.showSuccess('Data saved successfully');
   * ```
   */
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  /**
   * Displays an error message using a snack bar.
   * The message is shown for 3000 milliseconds at the top of the screen.
   * 
   * @param message - The message to display.
   * 
   * @example
   * ```
   * this.notificationService.showError('An error occurred while saving data');
   * ```
   */
  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  /**
   * Displays an informational message using a snack bar.
   * The message is shown for 3000 milliseconds at the top of the screen.
   * 
   * @param message - The message to display.
   * 
   * @example
   * ```
   * this.notificationService.showInfo('This is an informational message');
   * ```
   */
  showInfo(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }
}
