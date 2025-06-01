import { Routes } from '@angular/router';
import { canDeactivateGuard } from './guard/async-guard';

export const routes: Routes = [
  {
    path: 'page-1',
    canDeactivate: [canDeactivateGuard],
    loadComponent: () =>
      import('./page-1/page-1.component').then((m) => m.Route1Component),
  },
  {
    path: 'page-2',
    loadComponent: () =>
      import('./page-2/page-2.component').then((m) => m.Route2Component),
  },
];
