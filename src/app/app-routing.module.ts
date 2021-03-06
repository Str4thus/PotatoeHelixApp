import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'bucket-overview', pathMatch: 'full' },
  {
    path: 'bucket-overview',
    pathMatch: 'full',
    loadChildren: () => import('./pages/bucket-overview/bucket-overview.module').then( m => m.BucketOverviewPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'bucket-details',
    pathMatch: 'full',
    loadChildren: () => import('./pages/bucket-details/bucket-details.module').then( m => m.BucketDetailsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'bucket-add',
    pathMatch: 'full',
    loadChildren: () => import('./pages/bucket-add/bucket-add.module').then( m => m.BucketAddPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
