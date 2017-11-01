import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'info-navbar',
  templateUrl: './info-navbar.component.html',
  styleUrls: ['./info-navbar.component.css']
})
export class InfoNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public text: string;

}
