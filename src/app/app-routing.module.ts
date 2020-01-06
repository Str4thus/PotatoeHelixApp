import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'bucket-overview', pathMatch: 'full' },
  {
    path: 'bucket-overview',
    loadChildren: () => import('./pages/bucket-overview/bucket-overview.module').then( m => m.BucketOverviewPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'bucket-details',
    loadChildren: () => import('./pages/bucket-details/bucket-details.module').then( m => m.BucketDetailsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'bucket-add',
    loadChildren: () => import('./pages/bucket-add/bucket-add.module').then( m => m.BucketAddPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
