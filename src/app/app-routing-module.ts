import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/services/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
