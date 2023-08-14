import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Imports

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Components

import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponentComponent,
    LoginComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
