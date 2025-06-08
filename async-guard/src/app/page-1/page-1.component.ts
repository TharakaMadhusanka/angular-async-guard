import { Component } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { CanDeactivateComponent } from '../interfaces/can-deactivate-component.interface';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { AsyncGuardApiService } from '../service/async-guard-api.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-page-1',
  imports: [CommonModule, ButtonModule, CardModule, MessageModule],
  templateUrl: './page-1.component.html',
})
/**
 * instead of implementing CanDeactivate interface [which is used to reference the component directly], we can modify the same to
 * use with a STORE
 */
export class Page1Component implements CanDeactivateComponent {
  constructor(private asyncGuardApiService: AsyncGuardApiService) {}

  isButtonClicked = false;
  error: string | null = null;

  /** Component internally handled function
   * which is used to determine if there are unsaved changes
   * @returns {boolean} - true if there are unsaved changes, false otherwise
   * **/
  detectUnsavedChanges(): boolean {
    return this.isButtonClicked;
  }

  /**
   * Triggered when the user clicks the confirm button in the deactivation confirmation dialog.
   * This function simulates an asynchronous operation, such as an API call.
   * @returns {Observable<boolean>} - An observable that emits true if the operation is successful, or false if an error occurs.
   */
  onConfirmClick = (): Observable<boolean> => {
    // Simulating an asynchronous operation, such as an API call
    return this.asyncGuardApiService.getAsyncData().pipe(
      map(() => {
        return true;
      }),
      catchError((e: HttpErrorResponse) => {
        this.error = e?.message;
        return of(false);
      })
    );
  };
}
