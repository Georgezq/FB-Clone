import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Imports

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SidebarComponent } from './components/profile-sidebar/sidebar/sidebar.component'; 

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
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatListModule, 

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
