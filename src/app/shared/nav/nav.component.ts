import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/account-services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  mostrarHeader = true;
  public pathName: string = window.location.pathname;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.pathName == '/user/registrar' || this.pathName == '/user/login')
      this.mostrarHeader = false;
  }
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
