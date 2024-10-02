import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AllDestinationsComponent } from './pages/all-destinations/all-destinations.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'destinations/all', component: AllDestinationsComponent },
  { path: 'destinations/promotions', component: AllDestinationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservations', component: ReservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
