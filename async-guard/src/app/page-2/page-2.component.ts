import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeMonitorService } from '../service/change-monitor.service';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncGuardApiService } from '../service/async-guard-api.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-2',
  imports: [CommonModule, ButtonModule, CardModule, MessageModule],
  templateUrl: './page-2.component.html',
})
export class Page2Component implements OnInit, OnDestroy {
  error: string | null = null;
  isButtonClicked = false;

  constructor(
    private changeMonitorService: ChangeMonitorService,
    private asyncGuardApiService: AsyncGuardApiService
  ) {}

  /**
   * To use ChangeMonitorService, we need to call the startMonitoring method
   * Steps to use ChangeMonitorService:
   * 1. register the feature in the ChangeMonitor Registry -> registerFeatureForChangeMonitoring
   * 2. update the hasUnsavedChanges state in the ChangeMonitor Registry -> updateHasUnsavedChanges
   * 3. To Note :- It is important to remove the feature from the ChangeMonitor Registry when the component is destroyed
   *    -> unregisterFeature  to avoid the conflict with the next feature registration
   */

  ngOnInit(): void {
    // Register the feature in the ChangeMonitorService when the component is initialized
    this.changeMonitorService.registerFeatureForChangeMonitoring(
      'page-2',
      this.onConfirmClick // This is a placeholder for the handler function, replace with actual logic if needed
    );
  }

  ngOnDestroy(): void {
    // Unregister the feature from the ChangeMonitorService when the component is destroyed
    this.changeMonitorService.unregisterFeature('page-2');
  }

  handleUnsavedChanges(): void {
    // Update the hasUnsavedChanges state in the ChangeMonitorService
    this.isButtonClicked = !this.isButtonClicked;
    this.changeMonitorService.updateHasUnsavedChanges(
      'page-2',
      this.isButtonClicked
    );
  }

  // To bind the context, this function should be an arrow function
  onConfirmClick = (): Observable<boolean> => {
    return this.asyncGuardApiService.getAsyncData().pipe(
      map(() => true),
      catchError((e: HttpErrorResponse) => {
        this.error = e?.message;
        return of(false);
      })
    );
  };
}
