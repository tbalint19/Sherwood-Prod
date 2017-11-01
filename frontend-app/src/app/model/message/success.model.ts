import {Message} from "./message.model";

export class Success extends Message {

  constructor(title: string, text: string){
    super("success", title, text);
  }

}
