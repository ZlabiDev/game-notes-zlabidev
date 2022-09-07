import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
