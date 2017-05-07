import {NlpService} from '../../app/services/nlp.service'
import {VisionService} from '../../app/services/vision.service'
import {PostPage} from '../post/post';
import {DetailPostPage} from '../detailpost/detailpost';
import {SummaryPage} from '../summary/summary';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';

declare let BMap;

@Component({
  selector: 'page-emotion',
  templateUrl: 'emotion.html'
})

export class EmotionPage {
  @ViewChild('mapContainer')
  mapElement: ElementRef;

  items: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public toastCtrl: ToastController, private visionService: VisionService, private nlpService: NlpService) {
  }

  addPost() {
    let modal = this.modalCtrl.create(PostPage);
    modal.present();
  }

  showdetail() {
    let modal = this.modalCtrl.create(DetailPostPage);
    modal.present();
  }

  extractKeyword() {
    //TODO: invoke service
    let modal = this.modalCtrl.create(SummaryPage);
    modal.present();
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

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let map = new BMap.Map(this.mapElement.nativeElement,{enableMapClick:false,minZoom:8,maxZoom:20});
    let geolocation = new BMap.Geolocation();
    let size = 200;
    let divCtrl;
    divCtrl = loadCtrlDiv();
    divCtrl.hide();
    var top_right_navigation = new BMap.NavigationControl({anchor: 1, type: 1});
    map.addControl(top_right_navigation);

    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);

        // todo get the imgsrc, abbreviation_txt, txt from server.
        let txt = "No pain, No gain. That's the truth.";
        loadOverlay(r.point,"imgs/img0.jpeg", txt);
        let _txt = "No pain, No gain. That's the fake.";
        loadOverlay(new BMap.Point(r.point.lng - 0.0005,r.point.lat - 0.0005),"imgs/img0.jpeg", _txt);

        map.centerAndZoom(r.point,17);
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true});

    function loadOverlay(point, imgsrc, text) {
      // Construct this layer with the info
      function MotionOverlay(point) {
        this._point = point;
        this._imgsrc = imgsrc;
        this._text = text;
      }

      // Scale the size of the marker.
      function scale() {
        let center = map.getCenter();
        let distance = map.getDistance(point, center);
        let zoom = map.getZoom();
        if(distance < 10){
          distance = 10;
        }
        if(zoom < 10){
          distance = 8000;
        }
        else if(zoom < 17){
          distance = 2000;
        }
        else if(zoom < 18){
          distance = 1000;
        }
        let factor = 0.8;
        let scaledSize = (size * 0.002 * (Math.pow(zoom,3) * 0.01 * factor + 8000/distance*(1-factor)));
        return scaledSize;
      }

      // Set the information of the show div
      function setInfo(imgsrc, text, locationstr){
        divCtrl._img.setAttribute("src", imgsrc);
        divCtrl._div.getElementsByTagName("span")[0].innerHTML = locationstr;
        divCtrl._div.getElementsByTagName("span")[1].innerHTML = text;

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
          div.style.width = scale() + "px";
          div.style.height = scale() + "px";
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
        // Show the details of this div
        let that = this;
        div.ongotpointercapture = function(e){
          if(divCtrl != undefined) {
            let geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
              let addComp = rs.addressComponents;
              let address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
              setInfo(that._imgsrc, that._text, address);
              divCtrl.show();
            });
          }
          let e_ = window.event || e;
          if (e_.stopPropagation) {
            e_.stopPropagation();
          } else {
            e_.cancelBubble = true;
          }
        };

        // Add the layer to map
        map.getPanes().labelPane.appendChild(div);
        return div;
      }

      // Must implement, draw the div up on the pixel of the point
      MotionOverlay.prototype.draw = function () {
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x  - scale()/2 + "px";
        this._div.style.top = pixel.y - scale() + "px";
      }

      let myCompOverlay = new MotionOverlay(point);
      map.addOverlay(myCompOverlay);
      map.addEventListener("zoomend", function () {
        myCompOverlay._div.style.width = scale() + "px";
        myCompOverlay._div.style.height = scale() + "px";
      });
      // Add according map event listener: 1. click to hidden the details 2. drag | zoom to re-scale
      map.addEventListener("onclick", function () {
        if(divCtrl != undefined) {
          if(divCtrl.isVisible()){
            divCtrl.hide();
          }
        }
      });
      map.addEventListener("dragend", function() {
        myCompOverlay._div.style.width = scale() + "px";
        myCompOverlay._div.style.height = scale() + "px";
      })
    }
    function loadCtrlDiv() {
      function ZoomControl(){
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
          div.style.fontSize = "10px";
          div.style.boxShadow = "2px 2px 2px 2px #BBB6C2";
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

        let subdiv = document.createElement("div");
        {
          subdiv.style.backgroundColor = "#eeeeee";
          subdiv.style.margin = "0";
          subdiv.style.color = "black";
          subdiv.style.width = "100%";
          subdiv.style.height = "46%";
          subdiv.style.borderRadius = "inherit";
        }
        div.appendChild(subdiv);

        let pin = document.createElement("ion-icon");
        pin.setAttribute("name", "pin");
        pin.setAttribute("role", "img");
        pin.setAttribute("class", "icon icon-ios ion-ios-pin");
        pin.setAttribute("aria-label", "pin");
        pin.setAttribute("ng-reflect-name", "pin");
        pin.style.height = "2%";
        subdiv.appendChild(pin);

        let location = document.createElement("span");
        {
          location.style.margin = "0";
          location.style.width = "100%";
          location.style.height = "10%";
          location.style.display = "inline";
        }
        subdiv.appendChild(location);

        let span = this._span = document.createElement("span");
        {
          span.style.margin = "0";
          span.style.width = "100%";
          span.style.height = "88%";
          span.style.display = "block";
        }
        subdiv.appendChild(span);

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
