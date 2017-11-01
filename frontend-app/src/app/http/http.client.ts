import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpRequest} from "../model/http-request.model";
import _ from 'lodash';

@Injectable()
export class HttpClient {

  private urlPrefix = 'http://localhost:8000';
  private headers = new Headers({'Content-Type': 'application/json'});
  private requests: HttpRequest[] = [];

  constructor(private _http: Http) {}

  public transfer(request: HttpRequest): Observable<any> {
    if (request.method == "GET") { return this.get(request); }
    if (request.method == "POST") { return this.post(request); }
  }

  public findPending(request: HttpRequest): boolean {
    return this.requests.filter((req: HttpRequest) => _.isEqual(req, request)).length > 0;
  }

  private get(request: HttpRequest): Observable<any> {
    let requestOptions = new RequestOptions({headers: this.headers});
    this.enrich();
    this.report(request);
    let url = this.urlPrefix + request.url + this.buildUrl(request.data);
    return this.wrap(this._http
      .get(url, requestOptions)
      .map((response: Response) => {
        this.fulfill(request);
        return response.json();
      }
    ));
  }

  private post(request: HttpRequest) {
    let requestOptions = new RequestOptions({headers: this.headers});
    this.enrich();
    this.report(request);
    return this.wrap(this._http
      .post(this.urlPrefix + request.url, request.data, requestOptions)
      .map((response: Response) => {
        this.fulfill(request);
        return response.json();
      }
    ));
  }

  private report(request: HttpRequest): void {
    this.requests.push(request);
  }

  private fulfill(request: HttpRequest): void {
    this.requests = this.requests.filter((req: HttpRequest) => req != request);
  }

  private buildUrl(obj: any): string {
    let url = "";
    for (let key of Object.keys(obj)) {
      url = url == "" ? "?" : url + "&";
      url = url + key + "=" + obj[key];
    }
    return url;
  }

  private enrich(): void {
    if (localStorage['auth-token']) {
      this.headers.set('Authorization', localStorage['auth-token']);
    }
  }

  private wrap(response: Observable<Response>) {
    return response.catch((res: Response) => {
      console.error('Error while performing HTTP request', res);
      return Observable.throw(res);
    });
  }

}
