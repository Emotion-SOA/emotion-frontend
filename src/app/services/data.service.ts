import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class DataService {
  urlPrefix: string;
  token: string;

  constructor(private http: Http) {
    console.log('DataService Initialized...');
    this.urlPrefix = "http://emotion-soa.site:8080/emotion-server/api"
  }

  postLogin(email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/login", {"email": email, "password": password})
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }

  postRegister(username: string, email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/register", {"name": username, "email": email, "password": password})
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }
  
  uploadImage(base64: string) {
    return this.http.post(this.urlPrefix + "/image", {"base64": base64});
  }
  
  

}
