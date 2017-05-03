import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';

declare let BMap;

@Component({
  selector: 'page-emotion',
  templateUrl: 'emotion.html'
})

export class EmotionPage {
  @ViewChild('mapContainer')
  mapElement: ElementRef;

  constructor(private navCtrl: NavController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
    let point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    let geolocation = new BMap.Geolocation();
    let gl_r;
    let width = 200;
    let height = 400;
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0){
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        gl_r = r;
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
        // alert(map.getTargetStatus().tartget);
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
          this._map = map;
          let zoom = map.getZoom();// 3 - 19

          let div = this._div = document.createElement("div");
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.backgroundColor = "#EE5D5B";
          div.style.border = "1px solid #BC3B3A";
          div.style.color = "white";
          div.style.padding = "2px";
          div.style.lineHeight = "30px";
          div.style.width = scaleByZoom(zoom, width) + "px";
          div.style.height = scaleByZoom(zoom, height) + "px";
          div.style.fontSize = "20px";

          let img = this._img = document.createElement("IMG");
          img.setAttribute("src", "imgs/img0.jpeg");
          img.setAttribute("width", "100%");
          img.setAttribute("height", "60%");
          img.setAttribute("alt", "The Pulpit Rock");
          document.body.appendChild(img);
          div.appendChild(img);

          let span = this._span = document.createElement("span");
          div.appendChild(span);
          span.appendChild(document.createTextNode(this._text));
          let that = this;

          let arrow = this._arrow = document.createElement("div");
          arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png)  no-repeat";
          arrow.style.position = "absolute";
          arrow.style.width = "20px";
          arrow.style.height = "10px";
          arrow.style.top = "22px";
          arrow.style.left = "10px";
          arrow.style.overflow = "hidden";
          div.appendChild(arrow);

          div.onmouseover = function(){
            this.style.backgroundColor = "#6BADCA";
            this.style.width = "200px";
            this.style.height = "400px";
            this.style.borderColor = "#0000ff";
            this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px -20px";
          }

          div.onmouseout = function(){
            div.style.position = "absolute";
            this.style.backgroundColor = "#EE5D5B";
            this.style.borderColor = "#BC3B3A";
            this.style.width = "100px";
            this.style.height = "200px";
            this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";

          }
          map.getPanes().labelPane.appendChild(div);
          return div;
        }

        ComplexCustomOverlay.prototype.draw = function(){
          let map = this._map;
          let pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
          this._div.style.top  = pixel.y - 30 + "px";
        }

        let txt = "HHHHH" ;
        let myCompOverlay = new ComplexCustomOverlay(gl_r.point, "E-Motion", txt);
        map.addOverlay(myCompOverlay);

        map.addEventListener("dragend", function(){
          // alert("当前地图中心点：" + map.getCenter().lng + "," + map.getCenter().lat);
          // alert(map.getZoom());// 3 - 19
          this._div.style.width = scaleByZoom(this.getZoom(), width) + "px";
          this._div.style.height = scaleByZoom(this.getZoom(), height) + "px";
        });

      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true})

    // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }

    function scaleByZoom(zoom, size){
      return (19 - zoom) * size;
    }

  }

  post(msg : string) {
    // Post ...
    // Success.
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
