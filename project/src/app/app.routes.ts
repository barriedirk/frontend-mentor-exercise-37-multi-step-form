import { Routes } from '@angular/router';

import { MainLayout } from '@app/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'multi-step-form',
        loadComponent: () =>
          import('./features/multi-step-form/multi-step-form').then((m) => m.MultiStepForm),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
