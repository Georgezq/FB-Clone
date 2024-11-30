import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './auth/login-component/login-component.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswdComponent } from './auth/forgot-passwd/forgot-passwd.component';
import { CreateStoryComponent } from './components/historias/components/create-story/create-story.component';

const routes: Routes = [
  { path: 'login', component:LoginComponentComponent },
  { path: 'reset-password', component: ForgotPasswdComponent},
  { path: 'home', component: HomeComponent},
  { path: 'create', component: CreateStoryComponent},

  {path: '**', pathMatch:'full', redirectTo:'/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
