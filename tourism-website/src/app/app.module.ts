import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AllDestinationsComponent } from './pages/all-destinations/all-destinations.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationDialogComponent } from './components/reservation-dialog/reservation-dialog/reservation-dialog.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ContactComponent,
    AllDestinationsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SimpleCardComponent,
    ReservationsComponent,
    ReservationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
