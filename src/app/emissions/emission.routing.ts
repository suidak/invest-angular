import { Routes } from '@angular/router';
import { ListEmissionsComponent } from './list-emissions/list-emissions.component';
import { EmissionAddComponent } from './emission-add/emission-add.component';
import { EmissionDetailComponent } from './emission-detail/emission-detail.component';



export const EmissionRoute: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: ListEmissionsComponent,
    },
    {
      path: 'add',
      component: EmissionAddComponent,
    },
    {
      path: 'detail/:id',
      component: EmissionDetailComponent,
    },
    ]
  }
];
