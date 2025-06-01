import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  hasUnsavedChanges: () => boolean;
  onConfirmClick: () => Observable<boolean>;
}
