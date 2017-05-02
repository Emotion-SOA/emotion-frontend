import { Component } from '@angular/core';
import {NlpService} from '../../app/services/nlp.service'

@Component({
  selector: 'page-emotion',
  templateUrl: 'emotion.html'
})

export class EmotionPage {
  items: any;

  constructor(private nlpService: NlpService) {
  }

  //run everytime the page renders
  ngOnInit() {
    this.nlpService.test();
  }

  getPosts() {
    this.nlpService.getPosts().subscribe(response => {
      console.log(response);
      this.items = response.data.children;
    })
  }
}
