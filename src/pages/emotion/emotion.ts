import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';

declare var BMap;

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
    var map = new BMap.Map(this.mapElement.nativeElement);          // 创建地图实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
    // map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    // //创建小狐狸
    // var pt = new BMap.Point(116.404, 39.915);
    // var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
    // var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    // map.addOverlay(marker2);              // 将标注添加到地图中
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
