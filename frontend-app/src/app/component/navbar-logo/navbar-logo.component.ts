import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.css']
})
export class NavbarLogoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getHome(): void {
    if (localStorage.getItem('auth-token') &&
      !localStorage.getItem('auth-token').includes("Bearer ")
    ){
      localStorage.removeItem('auth-token');
    }
    this.router.navigate(['']);
  }

}
