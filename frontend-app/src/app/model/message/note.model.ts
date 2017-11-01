import {Message} from "./message.model";

export class Note extends Message {

  constructor(title: string, text: string){
    super("default", title, text);
  }

}
