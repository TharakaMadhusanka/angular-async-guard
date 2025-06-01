import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateComponent } from '../interfaces/can-deactivate-component.interface';
import { ConfirmationDialogService } from '../service/confirmation-dialog.service';
import { inject } from '@angular/core';

/** Here instead of using the Component Reference, we can modify to read the values from a STORE
 * As in persist the UnsavedChanges state in a store and read it from there
 * Persist the onConfirmClick function in a store and read it from there
 * This way we can use the same CanDeactivate guard for multiple components
 * Using the store we can extend this functionality to handle more complex scenarios
 */
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
