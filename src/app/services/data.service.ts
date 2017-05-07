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

  login(email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/login", {"email": email, "password": password})
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }

  register(username: string, email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/register", {"name": username, "email": email, "password": password})
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }
  
  // return value: {"imagePath": "/image/0.png"}
  uploadImage(base64: string) {
    return this.http.post(this.urlPrefix + "/image", {"base64": base64});
  }
  // Display image:
  // <img src="http://emotion-soa.site:8080/emotion-server/image/0.png">
  
  addPost(text: string, imagePath: string, latitude: number, longitude: number) {
    return this.http.post(this.urlPrefix + "/post", {
      "token": this.token,
      "text": text,
      "imagePath": imagePath,
      "latitude": latitude,
      "longitude": longitude
    });
  }
  
  getPostsByRange(latitude: number, longitude: number, range: number) {
    return this.http.get(this.urlPrefix + "/post/surrounding?longitude=" + longitude + "&latitude=" + latitude + "&range=" + range);
  }
  
  getWatsonNLPAnalysis(text: string) {
    return this.http.get(this.urlPrefix + "/watson?text=" + text);
  }
}
