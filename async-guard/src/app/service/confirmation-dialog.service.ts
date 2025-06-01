import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/*
 * ConfirmationDialogService is used to show a confirmation dialog
 * and execute a callback function if the user confirms the action.
 * This can be moved to Store if needed.
 */
export class ConfirmationDialogService {
  constructor(private confirmationService: ConfirmationService) {}

  showConfirmationDialog = new BehaviorSubject<boolean>(false);

  showConfirmationAndDoSomething = (
    callback: () => Observable<boolean>
  ): Observable<boolean> => {
    return new Observable<boolean>((observer) => {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Continue With No Action',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Trigger Component Function',
        },
        accept: async () => {
          const resp = await firstValueFrom(callback());
          observer.next(resp);
          observer.complete();
          this.showConfirmationDialog.next(false);
        },
        reject: () => {
          this.showConfirmationDialog.next(false);

          observer.next(true);
          observer.complete();
        },
      });
      this.showConfirmationDialog.next(true);
    });
  };
}
