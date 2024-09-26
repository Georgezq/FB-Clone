import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isSearchClicked = false;

  searchClicked(){
    this.isSearchClicked =!this.isSearchClicked;
  }

}
