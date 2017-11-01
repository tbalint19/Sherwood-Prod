import {HomeComponent} from './component/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {StartComponent} from './component/start/start.component';
import {ConfirmComponent} from './component/confirm/confirm.component';
import {ConfirmGuard} from './guard/confirm.guard';
import {ResetComponent} from "./component/reset/reset.component";

const appRoutes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'reset', component: ResetComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard, ConfirmGuard] },

  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
