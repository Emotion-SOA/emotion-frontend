import {Component} from '@angular/core';
import {NlpService} from '../../app/services/nlp.service'
import {VisionService} from '../../app/services/vision.service'
import {PostPage} from '../post/post'
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-emotion',
  templateUrl: 'emotion.html'
})

export class EmotionPage {
  items: any;

  constructor(public navCtrl: NavController, private visionService: VisionService, private nlpService: NlpService) {
  }

  addPost() {
    this.navCtrl.push(PostPage);
  }

  extractKeyword() {
    //TODO: invoke service
  }

  newPosts() {
    //TODO: put on new posts
  }

  //run everytime the page renders
  ngOnInit() {
  }

  //not used
  // getPosts() {
  //   this.nlpService.getPosts().subscribe(response => {
  //     console.log(response);
  //     this.items = response.data.children;
  //   })
  // }
}
