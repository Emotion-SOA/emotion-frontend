import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class DataService {
  private urlPrefix: string;
  private token: string;
  public allPosts: Post[];

  constructor(private http: Http) {
    console.log('DataService Initialized...');
    this.urlPrefix = "http://emotion-soa.site:8080/emotion-server/api";
    this.getPostsByRange(121, 31, 100000.0).map(res => res.json())
      .subscribe(posts => {
        this.allPosts = posts;
    });
  }

  login(email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/login", {"email": email, "password": password});
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }

  register(username: string, email: string, password: string) {
    let result = this.http.post(this.urlPrefix + "/user/register", {"name": username, "email": email, "password": password});
    result.subscribe(res => {
      this.token = res.json().token;
    });
    return result;
  }

  // return value: {"imagePath": "/image/0.png"}
  uploadImage(base64: string) {
    console.log("uploadImage api invoked...");
    return this.http.post(this.urlPrefix + "/image", {"base64": base64});
  }
  // Display image:
  // <img src="http://emotion-soa.site:8080/emotion-server/image/0.png">

  addPost(text: string, imagePath: string, latitude: number, longitude: number) {
    return this.http.post(this.urlPrefix + "/post/", {
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

  getWordCloud(text: string) {
    return this.http.get(this.urlPrefix + "/word-cloud?text=" + text);
  }
}

interface Post {
  imagePath: string;
  latitude:number;
  longitude: number;
  postID: number;
  text: string;
  userID: number;
}
