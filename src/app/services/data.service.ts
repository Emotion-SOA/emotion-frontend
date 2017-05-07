import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class DataService {
  url: string;

  constructor(private http: Http) {
    console.log('DataService Initialized...');
    this.url = "http://emotion-soa.site:8080/emotion-server/api/user/login"
  }

  postLogin(email: string, password: string) {//+'?email='+email+'&password='+password
    return this.http.post(this.url, {"email": email, "password": password})
      .map(res => {
        console.log(res);
        res.json();
      });
      // .catch();
  }

  postRegister(username: string, email: string, password: string) {
    return this.http.post(this.url, {"name": username, "email": email, "password": password})
      .map(res => res.json());
  }

}
