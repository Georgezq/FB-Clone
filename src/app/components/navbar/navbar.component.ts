import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Users } from 'src/app/models/users/users';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    ]),

  ]})
export class NavbarComponent {

  // Inputs

  @Input() name: string = '';
  @Input() lastName: string = '';
  @Input() userPhoto: string = '';
  @Input() isLoggedIn: boolean = false;

  isSearchClicked: boolean = false;
  userId: string = '';
  user: Users;
  navbarMenuActive: boolean = false;

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

  profileOptions = [
    { texto: 'Configuración y privacidad', icon: 'assets/icons/nav-icons/profile-icons/settings.svg', },
    { texto: 'Ayuda y soporte técnico', icon: 'assets/icons/nav-icons/profile-icons/help.svg', },
    { texto: 'Pantalla y accesibilidad', icon: 'assets/icons/nav-icons/profile-icons/accesibilidad.svg', },
    { texto: 'Enviar comentarios', icon: 'assets/icons/nav-icons/profile-icons/comentarios.svg', },
    { texto: 'Cerrar sesión', icon: 'assets/icons/nav-icons/profile-icons/leave.svg', },
  ]

  constructor(private elementRef: ElementRef, private storageService: StorageService, private AuthService: AuthService){
    const currentUser = JSON.parse(localStorage.getItem('currenUser')!);
    this.userId = currentUser.uid;
  }

  searchClicked(event: Event): void {
    event.stopPropagation();
    this.isSearchClicked =!this.isSearchClicked;
  }

  menuClicked(event: Event): void {
    event.stopPropagation();
    this.navbarMenuActive =!this.navbarMenuActive;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if(!this.elementRef.nativeElement.contains(event.target)){
      this.isSearchClicked = false;
      this.navbarMenuActive = false;
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
    this.AuthService.updateProfileFireStore(this.userId, update)
  }

}
