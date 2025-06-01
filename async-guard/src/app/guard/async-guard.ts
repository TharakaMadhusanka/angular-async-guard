import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { CanDeactivateComponent } from '../interfaces/can-deactivate-component.interface';
import { ConfirmationService } from 'primeng/api';
import { ConfirmationDialogService } from '../service/confirmation-dialog.service';
import { inject } from '@angular/core';

export const canDeactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component: CanDeactivateComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
): Observable<boolean> | boolean => {
  console.log(currentRoute, currentState, nextState);
  const confirmationDialogService = inject(ConfirmationDialogService);
  return component.hasUnsavedChanges()
    ? confirmationDialogService.showConfirmationAndDoSomething(
        component.onConfirmClick
      )
    : true;
};
