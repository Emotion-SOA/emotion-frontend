/**
 * Created by mayezhou on 2017/5/1.
 */
import {Injectable} from "@angular/core";
import "rxjs/Rx";
import * as NaturalLanguageUnderstandingV1 from "watson-developer-cloud/natural-language-understanding/v1.js"; //{NaturalLanguageUnderstandingV1} from

@Injectable()
export class NlpService {
  http: any;
  url: string;
  username: string;
  password: string;

  constructor() {//http: Http
    // this.http = http;
    this.url = "https://gateway.watsonplatform.net/natural-language-understanding/api";
    this.username = "63b4f5b3-9a8d-4e85-a2a4-8c76e35889da";
    this.password = "TR5Oyt3gPU25";
  }

  //TODO
  getPosts() {
    return this.http.post().map(response => response.json());
  }

  test() {
    let natural_language_understanding = new NaturalLanguageUnderstandingV1({
      'username': this.username,
      'password': this.password,
      'version_date': '2017-02-27',
      headers: {
        'X-Watson-Learning-Opt-Out': 'true',
        // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
    let parameters = {
      'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        },
        'keywords': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        }
      }
    };
    natural_language_understanding.analyze(parameters, function(err, response) {
      // response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
    });
  }
}
