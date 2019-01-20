import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@pages/components/shared.module';
import { RouterModule } from '@angular/router';
import { pgCardModule } from '../@pages/components/card/card.module';
import { TabsModule } from 'ngx-bootstrap';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { pgSelectModule} from '../@pages/components/select/select.module';
import { pgSliderModule } from '../@pages/components/slider/slider.module';
import { ProgressModule } from '../@pages/components/progress/progress.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoute } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from '../_services/user.service';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(UserRoute),
    pgCardModule,
    SharedModule,
    ProgressModule,
    TabsModule,
    pgSelectModule,
    pgTabsModule,
    FormsModule,
    ReactiveFormsModule,
    pgSliderModule

  ],
  declarations: [LoginComponent, RegisterComponent],
  providers:[UserService]
})
export class UsersModule { }
