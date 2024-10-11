import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  mostrarHeader = true;
  public pathName: string = window.location.pathname;
  constructor() {}

  ngOnInit() {
    if (this.pathName == '/user/registrar' || this.pathName == '/user/login')
      this.mostrarHeader = false;
  }
}
