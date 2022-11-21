import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ParkingFormComponent } from './components/parking-form/parking-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetrieveSpaceshipFormComponent } from './components/retrieve-spaceship-form/retrieve-spaceship-form.component';
import { DataService } from './services/data.service';
import { TicketComponent } from './components/ticket/ticket.component';
import { GoodbyeReceiptComponent } from './components/goodbye-receipt/goodbye-receipt.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parkingForm', component: ParkingFormComponent },
  { path: 'retrieveSpaceshipForm', component: RetrieveSpaceshipFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParkingFormComponent,
    RetrieveSpaceshipFormComponent,
    TicketComponent,
    GoodbyeReceiptComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
