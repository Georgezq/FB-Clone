import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';

const routes: Routes = [
  {path: 'login', component:LoginComponentComponent},


  {path: '**', pathMatch:'full', redirectTo:'/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
