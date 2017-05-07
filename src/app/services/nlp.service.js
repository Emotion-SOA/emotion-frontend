var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by mayezhou on 2017/5/1.
 */
import { Injectable } from '@angular/core';
// import {Http} from '@angular/http';
import 'rxjs/Rx';
// import 'watson-developer-cloud/natural-language-understanding/v1.js'; //{NaturalLanguageUnderstandingV1} from
// import { NaturalLanguageUnderstandingV1 } from 'watson-developer-cloud/natural-language-understanding/v1';
var NlpService = (function () {
    function NlpService() {
        // this.http = http;
        this.url = "https://gateway.watsonplatform.net/natural-language-understanding/api";
        this.username = "63b4f5b3-9a8d-4e85-a2a4-8c76e35889da";
        this.password = "TR5Oyt3gPU25";
    }
    //TODO
    NlpService.prototype.getPosts = function () {
        return this.http.post().map(function (response) { return response.json(); });
    };
    NlpService.prototype.test = function () {
        var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
        var natural_language_understanding = new NaturalLanguageUnderstandingV1({
            'username': this.username,
            'password': this.password,
            'version_date': '2017-02-27'
        });
        var parameters = {
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
        natural_language_understanding.analyze(parameters, function (err, response) {
            if (err)
                console.log('error:', err);
            else
                console.log(JSON.stringify(response, null, 2));
        });
    };
    return NlpService;
}());
NlpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], NlpService);
export { NlpService };
//# sourceMappingURL=nlp.service.js.map
