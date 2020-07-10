import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {UiWidgetsComponent} from './components/ui-widgets/ui-widgets.component';
import {ApplicationsComponent} from './components/applications/applications.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full'
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'widgets',
    component: UiWidgetsComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
