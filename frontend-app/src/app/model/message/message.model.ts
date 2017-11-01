export class Message {

  severity: string;
  title: string;
  text: string;
  isRelevant: boolean;

  constructor(severity: string = "default", title: string, text: string){
    this.severity = severity;
    this.title = title;
    this.text = text;
    this.existForAWhile()
  }

  existForAWhile(){
    this.isRelevant = true;
    setInterval(() => {
      this.isRelevant = false;
    }, 5000)
  }

}
