import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Users } from 'src/app/models/users/users';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('0.3s ease')
      ])
    ]),

    trigger('paddingL', [
      state('whPd', style({
        padding: '0 0 0 50px'
      })),
      state('wiPd', style({
        padding: '0 0 0 20px',
      }))
    ])

  ]})
export class NavbarComponent {

  isSearchClicked: boolean = false;
  userId: string = '';
  user: Users
  tooltipTextMenu = [
    { text: 'Inicio', icon: 'assets/icons/nav-icons/home.svg', route: 'home'},
    { text: 'Videos', icon: 'assets/icons/nav-icons/video.svg', route: 'videos'},
    { text: 'Marketplace', icon: 'assets/icons/nav-icons/marketplace.svg', route: 'marketplace'},
    { text: 'Grupos', icon: 'assets/icons/nav-icons/groups.svg', route: 'grupos'},
    { text: 'VideoJuegos', icon: 'assets/icons/nav-icons/games.svg', route: 'videoJuegos'},
  ]

  tooltipOptions = [
    { texto: 'Menú', icon: 'assets/icons/nav-icons/menu.svg'},
    { texto: 'Messenger', icon: 'assets/icons/nav-icons/messenger.svg'},
    { texto: 'Notificaciones', icon: 'assets/icons/nav-icons/notification.svg'},
    
  ]

  constructor(private elementRef: ElementRef, private storageService: StorageService, private loginService: LoginService){
    const currentUser = JSON.parse(localStorage.getItem('currenUser')!);
    this.userId = currentUser.uid;
  }

  searchClicked(event: Event): void {
    event.stopPropagation();
    this.isSearchClicked =!this.isSearchClicked;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if(!this.elementRef.nativeElement.contains(event.target)){
      this.isSearchClicked = false;
    }
  }


  onFileSelected(event:any){
    const archivoSeleccionado:File = event.target.files[0];
    this.storageService.uploadImageProfile(this.userId, archivoSeleccionado);
    //this.textfile = archivoSeleccionado.name;
  }

  updateName(){
    const update: Users = {
      nombre: 'Geor',
      apellido: 'Garcia',
      email: 'yosho2mendoza@gmail.com',
      password: 'georgio123',
      foto: this.userId + '.jpg',
    }
    this.loginService.updateProfileFireStore(this.userId, update)
  }

}
