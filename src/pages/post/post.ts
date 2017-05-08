import {Component} from "@angular/core";
import {
  ToastController,
  ViewController,
  Platform,
  NavParams,
  NavController,
  Loading,
  ActionSheetController,
  LoadingController
} from "ionic-angular";
import {DataService} from "../../app/services/data.service";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {Camera} from "@ionic-native/camera";

declare let cordova: any;

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  text: string;
  lastImage: string = null;
  loading: Loading;
  longitude: number;
  latitude: number;
  location: string;

  constructor(public toastCtrl: ToastController,
              public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public navCtrl: NavController,
              private dataService: DataService,
              private camera: Camera,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController) {
  }

  post() {
    this.longitude = this.params.get("longtitude");
    this.latitude = this.params.get("latitude");
    this.location = this.params.get("address");
    //upload image
    this.lastImage = this.uploadImage();

    //store into DB
    this.dataService.addPost(this.text, this.lastImage, this.latitude, this.longitude).subscribe(res => {
      console.log(res.json());
      this.toastCtrl.create({
        message: 'Check console\'s log\n',
        duration: 3000, position: 'middle'
      }).present();
    });
    let toast = this.toastCtrl.create({
      message: 'Post successfully',
      duration: 3000,
      position: 'middle'

    });
    toast.present();
    this.dismiss();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your photo',
      buttons: [
        {
          text: 'Take a photo',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Choose from library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(): string {
    let imageName: string = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    this.file.readAsDataURL(cordova.file.dataDirectory, this.lastImage)
      .then((res) => {
        console.log("in uploadImage, promise res=" + res);
        this.loading.dismissAll();
        this.dataService.uploadImage(res).subscribe(r => {
          if (r.json().error) {
            console.log("uploadImage api return error=" + r.json().error);
          } else {
            this.presentToast("Upload Success");
            imageName = r.json().imageName;
          }
        }, err => {
          console.log("api invoke err" + err);
        });
      })
      .catch((err) => {
        console.log("file read err" + err);
      });
    return imageName;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
