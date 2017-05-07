/**
 * Created by mayezhou on 2017/5/1.
 */
import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class NlpService {
  url: string;

  constructor(private http: Http) {
  }

  //TODO
  getPosts() {
    return this.http.post(this.url, {}).map(response => response.json());
  }

}
