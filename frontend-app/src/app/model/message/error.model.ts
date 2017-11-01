import {Message} from "./message.model";

export class Error extends Message {

  constructor(title: string, text: string){
    super("error", title, text);
  }

}
