import { Component } from '@angular/core';
import {NlpService} from '../../app/services/nlp.service'
import {VisionService} from '../../app/services/vision.service'

@Component({
  selector: 'page-emotion',
  templateUrl: 'emotion.html'
})

export class EmotionPage {
  items: any;

  constructor(private visionService: VisionService, private nlpService: NlpService) {
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
