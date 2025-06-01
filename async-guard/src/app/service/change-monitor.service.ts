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

  registerFeatureForChangeMonitoring(
    featureName: string,
    handlerFunction: () => Observable<boolean>
  ): void {
    this._registry.set(featureName, {
      hasUnsavedChanges: false,
      handlerFunction: handlerFunction,
    });
  }

  updateHasUnsavedChanges(
    featureName: string,
    hasUnsavedChanges: boolean
  ): void {
    const feature = this._registry.get(featureName);
    if (feature) {
      feature.hasUnsavedChanges = hasUnsavedChanges;
    }
  }

  getHasUnsavedChanges(featureName: string): boolean {
    const feature = this._registry.get(featureName);
    return feature ? feature.hasUnsavedChanges : false;
  }
  getHandlerFunction(featureName: string): (() => Observable<boolean>) | null {
    const feature = this._registry.get(featureName);
    return feature ? feature.handlerFunction : null;
  }
  clearRegistry(): void {
    this._registry.clear();
  }
  hasFeatureRegistered(featureName: string): boolean {
    return this._registry.has(featureName);
  }
  getRegisteredFeatures(): string[] {
    return Array.from(this._registry.keys());
  }
  unregisterFeature(featureName: string): void {
    this._registry.delete(featureName);
  }
}
