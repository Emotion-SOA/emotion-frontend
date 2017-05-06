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
    let map = new BMap.Map(this.mapElement.nativeElement,{enableMapClick:false,minZoom:8,maxZoom:20});
    let geolocation = new BMap.Geolocation();
    let gl_r;
    let width = 200;
    let height = 250;
    let divCtrl;
    divCtrl = loadCtrlDiv();
    divCtrl.hide();

    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        gl_r = r;
        loadOverlay();
        map.centerAndZoom(r.point,17);
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true});

    function loadOverlay() {
      function MotionOverlay(point, imgsrc, text) {
        this._point = point;
        this._imgsrc = imgsrc;
        this._text = text;
      }
      function scaleByZoom(size) {
        // return (map.getZoom()) * size * 0.1;
        return (size * (map.getZoom()) * 0.02);
      }
      function setInfo(imgsrc, text){
        divCtrl._img.setAttribute("src", imgsrc);
        divCtrl._div.getElementsByTagName("span")[0].innerHTML = text;
      }

      MotionOverlay.prototype = new BMap.Overlay();
      MotionOverlay.prototype.initialize = function (map) {
        this._map = map;
        let div = this._div = document.createElement("div");
        {
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.backgroundColor = "#356284";
          div.style.opacity = "0.8";
          div.style.color = "white";
          div.style.padding = "1px";
          div.style.lineHeight = "20px";
          div.style.width = scaleByZoom(width) + "px";
          div.style.height = scaleByZoom(height) + "px";
          div.style.fontSize = "5px";
          div.style.borderRadius = "5px 5px 5px 5px";
        }
        let img = this._img = document.createElement("IMG");
        {
          img.setAttribute("src", this._imgsrc);
          img.style.borderRadius = "inherit";
          img.style.width = "100%";
          img.style.height = "100%";
        }
        document.body.appendChild(img);
        div.appendChild(img);

        let that = this;
        div.ongotpointercapture = function(e){
          if(divCtrl != undefined) {
              setInfo(that._imgsrc, that._text);
              divCtrl.show();
          }
          let e_ = window.event || e;
          if (e_.stopPropagation) {
            e_.stopPropagation();
          } else {
            e_.cancelBubble = true;
          }
        };

        map.addEventListener("onclick", function () {
          if(divCtrl != undefined) {
            if(divCtrl.isVisible()){
              divCtrl.hide();
            }
          }
        });

        map.getPanes().labelPane.appendChild(div);
        return div;
      }
      MotionOverlay.prototype.draw = function () {
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x  + "px";
        this._div.style.top = pixel.y - 30 + "px";
      }

      // todo get the imgsrc, abbreviation_txt, txt from server.
      let txt = "No pain, No gain. That's the truth.";
      let myCompOverlay = new MotionOverlay(gl_r.point, "imgs/img0.jpeg",  txt);
      map.addOverlay(myCompOverlay);
      map.addEventListener("zoomend", function () {
        // alert("当前地图中心点：" + map.getCenter().lng + "," + map.getCenter().lat);
        myCompOverlay._div.style.width = scaleByZoom(width) + "px";
        myCompOverlay._div.style.height = scaleByZoom(height) + "px";
      });
    }
    function loadCtrlDiv() {
      function ZoomControl(){
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMap.BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(50, 50);
      }
      ZoomControl.prototype = new BMap.Control();
      ZoomControl.prototype.initialize = function(map){
        this._map = map;
        let div = this._div = document.createElement("div");
        {
          div.style.position = "absolute";
          div.style.backgroundColor = "#356284";
          div.style.color = "white";
          div.style.padding = "2px";
          div.style.margin = "10%";
          div.style.lineHeight = "30px";
          div.style.width = "80%";
          div.style.height = "80%";
          div.style.fontSize = "20px";
          div.style.boxShadow = "5px 5px 20px 2px #4E6299";
          div.style.borderRadius = "20px 20px 20px 20px";
        }
        let img = this._img = document.createElement("IMG");
        {
          img.setAttribute("src", "");
          img.style.borderRadius = "inherit";
          img.style.width = "100%";
          img.style.height = "50%";
        }
        document.body.appendChild(img);
        div.appendChild(img);

        let span = this._span = document.createElement("span");
        div.appendChild(span);

        map.getContainer().appendChild(div);
        return div;
      }
      var myZoomCtrl = new ZoomControl();
      map.addControl(myZoomCtrl);
      return myZoomCtrl;
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
