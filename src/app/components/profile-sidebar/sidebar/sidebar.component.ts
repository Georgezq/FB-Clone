import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PublicationService } from 'src/app/services/publication/publication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() userName: string = '';
  @Input() lastName: string = '';
  @Input() userPhoto: string = '';
  @Input() loading: boolean = false;

  

  optionsSidenar = [
    {optName: 'Amigos', icon: 'assets/images/friends.png', route: ''},
    {optName: 'Recuerdos', icon: 'assets/images/memories.png', route: ''},
    {optName: 'Guardado', icon: 'assets/images/saved.png', route: ''},
    {optName: 'Grupos', icon: 'assets/images/groups.png', route: ''},
    {optName: 'Video', icon: 'assets/images/video.png', route: ''},
    {optName: 'Marketplace', icon: 'assets/images/marketplace.png', route: ''},
    {optName: 'Feeds', icon: 'assets/images/feeds.png', route: ''},
  ]

  
   
   

}
