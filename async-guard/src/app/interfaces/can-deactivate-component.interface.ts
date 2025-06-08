import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  // A method to detect unsaved changes in the component
  detectUnsavedChanges: () => boolean;
  // A method to handle the confirmation action when deactivating
  // This method should return an Observable that emits true if the user confirms,
  // or false if they cancel
  onConfirmClick: () => Observable<boolean>;
}
