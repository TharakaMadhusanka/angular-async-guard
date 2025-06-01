import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanDeactivateComponent } from '../interfaces/can-deactivate-component.interface';
import { ConfirmationDialogService } from '../service/confirmation-dialog.service';
import { inject } from '@angular/core';
import { ChangeMonitorService } from '../service/change-monitor.service';

/** Here instead of using the Component Reference, we can modify to read the values from a STORE
 * As in persist the UnsavedChanges state in a store and read it from there
 * Persist the onConfirmClick function in a store and read it from there
 * This way we can use the same CanDeactivate guard for multiple components
 * Using the store we can extend this functionality to handle more complex scenarios
 */
export const canDeactivateGuardWithComponentReference: CanDeactivateFn<
  CanDeactivateComponent
> = (component: CanDeactivateComponent): Observable<boolean> | boolean => {
  const confirmationDialogService = inject(ConfirmationDialogService);
  return component.hasUnsavedChanges()
    ? confirmationDialogService.showConfirmationAndDoSomething(
        component.onConfirmClick
      )
    : true;
};

export const canDeactivateGuardWithSharedRegistry: CanDeactivateFn<unknown> = (
  _component: unknown,
  currentRoute: ActivatedRouteSnapshot,
  _currentState: RouterStateSnapshot,
  _nextState?: RouterStateSnapshot
): Observable<boolean> | boolean => {
  // Each feature module can register its own name in the route data
  // Here in this example, we are using the 'modueleName' key to get the feature name
  const featureName = currentRoute.data['moduleName'] as string;
  if (!featureName) {
    return true;
  }
  const changeMonitorService = inject(ChangeMonitorService);
  const confirmationDialogService = inject(ConfirmationDialogService);
  return changeMonitorService.getHasUnsavedChanges(featureName)
    ? confirmationDialogService.showConfirmationAndDoSomething(
        changeMonitorService.getHandlerFunction(featureName) || (() => of(true))
      )
    : true;
};
