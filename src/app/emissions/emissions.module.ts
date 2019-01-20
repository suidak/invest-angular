import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@pages/components/shared.module';
import { ListEmissionsComponent } from './list-emissions/list-emissions.component';
import { RouterModule } from '@angular/router';
import { EmissionRoute } from './emission.routing';
import { pgCardModule } from '../@pages/components/card/card.module';
import { EmissionAddComponent } from './emission-add/emission-add.component';
import { TabsModule } from 'ngx-bootstrap';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { pgSelectModule} from '../@pages/components/select/select.module';
import { pgSliderModule } from '../@pages/components/slider/slider.module';
import { ProgressModule } from '../@pages/components/progress/progress.module';
import { pgTagModule } from '../@pages/components/tag/tag.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformationsComponent } from './emission-add/informations/informations.component';
import { DocumentsComponent } from './emission-add/documents/documents.component';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import { EmpruntComponent } from './emission-add/emprunt/emprunt.component';
import { ContratComponent } from './emission-add/contrat/contrat.component';
import { QuestionsComponent } from './emission-add/questions/questions.component';
import { EmetteurComponent } from './emission-add/emetteur/emetteur.component';
import { EmissionDetailComponent } from './emission-detail/emission-detail.component';
import { pgDatePickerModule } from '../@pages/components/datepicker/datepicker.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { pgCollapseModule } from '../@pages/components/collapse';
import { EmissionComponent } from './emission/emission.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmissionRoute),
    pgCardModule,
    SharedModule,
    ProgressModule,
    TabsModule,
    pgTagModule,
    pgSelectModule,
    pgTabsModule,
    FormsModule,
    ReactiveFormsModule,
    pgUploadModule,
    pgSliderModule,
    pgDatePickerModule,
    NgxDatatableModule,
    pgCollapseModule.forRoot(),
  ],
  declarations: [ListEmissionsComponent, EmissionAddComponent, InformationsComponent, DocumentsComponent, EmpruntComponent, ContratComponent, QuestionsComponent, EmetteurComponent, EmissionDetailComponent, EmissionComponent]
})
export class EmissionsModule { }
