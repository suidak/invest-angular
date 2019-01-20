import { Routes } from '@angular/router';
//Layouts
import {
  SimplyWhiteLayout, BlankSimplywhiteComponent,
} from './@pages/layouts';

//Sample Pages
import { SimplyWhiteDashboardComponent } from './dashboard/simplywhite/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';

export const AppRoutes: Routes = [

  //Simply White Routes
  {
    path: 'users',
    component: BlankSimplywhiteComponent,
    children: [{
      path: '',
      loadChildren: './users/users.module#UsersModule'
    }]
  },

  {
    path: 'app',
    canActivate: [AuthGuard],
    component: SimplyWhiteLayout,
    children: [
    {
      path: 'emissions',
      loadChildren: './emissions/emissions.module#EmissionsModule'
    },
   ],
  },
  {
    "path": "**",
    "redirectTo": "/app/emissions",
    "pathMatch": "full"
  }
  
  
  

];
