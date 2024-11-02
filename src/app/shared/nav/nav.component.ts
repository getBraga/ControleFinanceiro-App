import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '@app/services/account-services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  mostrarHeader = true;
  public usuarioLogado = false;
  public pathName: string = window.location.pathname;
  constructor(public userService: UserService, private router: Router) {
    //outra forma de verificar se o usuario esta logado
    // router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     this.userService.currentUser$.subscribe(
    //       (value) => (this.usuarioLogado = value.userName != null)
    //     );
    //     console.log(this.usuarioLogado, 'usus');
    //   }
    // });
  }

  ngOnInit() {}
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
