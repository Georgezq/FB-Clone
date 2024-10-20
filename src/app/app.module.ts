import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Imports

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components

import { RegisterComponentComponent } from './auth/register-component/register-component.component';
import { LoginComponentComponent } from './auth/login-component/login-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HistoriasComponent } from './components/historias/historias.component';

//Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage  } from '@angular/fire/storage';
import { environment } from 'src/environments/enviroments';
import { MainPublicacionesComponent } from './components/publicaciones/main-publicaciones/main-publicaciones.component';
import { ForgotPasswdComponent } from './auth/forgot-passwd/forgot-passwd.component';
import { ErrorFormComponent } from './core/components/error-form/error-form.component';
import { TooltipMessageComponent } from './core/components/tooltip-message/tooltip-message.component';
import { UsersListComponent } from './components/publicaciones/users-list/users-list.component';

import {MatListModule} from '@angular/material/list';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';

import { SidebarComponent } from './components/profile-sidebar/sidebar/sidebar.component';
import { DateDisplayPipe } from './core/pipes/date-display.pipe';
import { DatePipe } from '@angular/common';
import { DoPubComponent } from './components/publicaciones/do-pub/do-pub.component';
import { CreateStoryComponent } from './components/pages/create-story/create-story.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponentComponent,
    LoginComponentComponent,
    NavbarComponent,
    HomeComponent,
    HistoriasComponent,
    MainPublicacionesComponent,
    ForgotPasswdComponent,
    ErrorFormComponent,
    TooltipMessageComponent,
    UsersListComponent,
    SidebarComponent,
    DateDisplayPipe,
    DoPubComponent,
    CreateStoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,  
    MatTooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
