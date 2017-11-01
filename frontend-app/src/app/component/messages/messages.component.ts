import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
import {MessageService} from "../../service/message.service";

@Component({
  moduleId: module.id,
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css'],
  selector: 'messages'
})
export class MessagesComponent{

  constructor(private router: Router, private messages: MessageService){
  }

  getRelevant(){
    return this.messages.getRelevant();
  }

}
