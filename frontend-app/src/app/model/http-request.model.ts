export class HttpRequest {

  url: string;
  method: string;
  data: any;

  constructor(url: string, method: string, data: any){
    this.url = url;
    this.method = method;
    this.data = data;
  }
}
