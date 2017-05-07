var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
var PostPage = (function () {
    function PostPage(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    PostPage.prototype.post = function () {
        // Post ...
        // Success.
        var toast = this.toastCtrl.create({
            message: 'Post successfully',
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    return PostPage;
}());
PostPage = __decorate([
    Component({
        selector: 'page-post',
        templateUrl: 'post.html'
    }),
    __metadata("design:paramtypes", [ToastController])
], PostPage);
export { PostPage };
//# sourceMappingURL=post.js.map