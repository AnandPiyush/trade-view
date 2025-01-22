import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { TradeUiComponent } from './trade-ui/trade-ui.component';

export const routes: Routes = [
    {path: '', component:LandingPageComponent},
    {path: 'login', component:LandingPageComponent},
    {path: 're-direct', component:AuthRedirectComponent},
    {path: 'trade-data', component:TradeUiComponent},
];
