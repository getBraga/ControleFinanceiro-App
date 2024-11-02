import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from './services/account-services/user.service';
import { User } from './models/User';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ControleFinanceiro-App';

  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser(): void {
    let user: User = {} as User;

    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user') ?? '');
    }

    this.userService.setCurrentUser(user);
  }
}
