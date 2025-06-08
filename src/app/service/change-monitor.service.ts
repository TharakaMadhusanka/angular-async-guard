import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeMonitorService {
  private _registry: Map<
    string,
    {
      hasUnsavedChanges: boolean;
      handlerFunction: () => Observable<boolean>;
    }
  > = new Map();

  constructor() {}

  // Use this method to register a feature for change monitoring
  // The handlerFunction should return an Observable that emits true if the user confirms,
  // or false if they cancel
  registerFeatureForChangeMonitoring(
    featureName: string,
    handlerFunction: () => Observable<boolean>
  ): void {
    this._registry.set(featureName, {
      hasUnsavedChanges: false,
      handlerFunction: handlerFunction,
    });
  }

  // Use this method to update the unsaved changes state for a feature
  // This should be called whenever there are changes in the feature that need to be monitored
  updateHasUnsavedChanges(
    featureName: string,
    hasUnsavedChanges: boolean
  ): void {
    const feature = this._registry.get(featureName);
    if (feature) {
      feature.hasUnsavedChanges = hasUnsavedChanges;
    }
  }

  // Use this method to get the unsaved changes state for a feature
  // To Note, this can be modified to return overall unsaved changes state
  // across all features if needed
  getHasUnsavedChanges(featureName: string): boolean {
    const feature = this._registry.get(featureName);
    return feature ? feature.hasUnsavedChanges : false;
  }

  // Use this method to get the handler function for a feature
  // This function should be called when the user tries to navigate away from the feature
  getHandlerFunction(featureName: string): (() => Observable<boolean>) | null {
    const feature = this._registry.get(featureName);
    return feature ? feature.handlerFunction : null;
  }

  // Use this method to clear the registry
  // This can be useful when the application is shutting down or when the features are no longer needed
  clearRegistry(): void {
    this._registry.clear();
  }

  // Use this method to check if a feature is registered
  // This can be useful to avoid registering the same feature multiple times
  hasFeatureRegistered(featureName: string): boolean {
    return this._registry.has(featureName);
  }

  // Use this method to get the list of registered features
  getRegisteredFeatures(): string[] {
    return Array.from(this._registry.keys());
  }

  // Use this method to unregister a feature
  unregisterFeature(featureName: string): void {
    this._registry.delete(featureName);
  }
}
