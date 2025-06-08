import { Routes } from '@angular/router';
import {
  canDeactivateGuardWithComponentReference,
  canDeactivateGuardWithSharedRegistry,
} from './guard/async-guard';

export const routes: Routes = [
  {
    path: 'page-1',
    canDeactivate: [canDeactivateGuardWithComponentReference],
    data: { moduleName: 'page-1' },
    loadComponent: () =>
      import('./page-1/page-1.component').then((m) => m.Page1Component),
  },
  {
    path: 'page-2',
    data: { moduleName: 'page-2' },
    canDeactivate: [canDeactivateGuardWithSharedRegistry],
    loadComponent: () =>
      import('./page-2/page-2.component').then((m) => m.Page2Component),
  },
];
