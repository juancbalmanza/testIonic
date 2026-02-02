import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'task',
    loadComponent: () => import('./pages/task/task.page').then( m => m.TaskPage)
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
];
