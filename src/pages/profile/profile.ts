import {Component} from "@angular/core";
import {
  ToastController,
  Platform,
  NavController,
  ActionSheetController,
  LoadingController,
  Loading
} from "ionic-angular";
import {File} from "@ionic-native/file";
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {Camera} from "@ionic-native/camera";
import {DataService} from "../../app/services/data.service";

declare let cordova:any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  lastImage: string = null;
  loading: Loading;

  constructor(public toastCtrl: ToastController,
              public dataService: DataService,
              public platform: Platform,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController) {

  }

  dismiss() {
    this.navCtrl.pop();
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

  public uploadImage() {
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
            console.log("uploadImage api return error=" + r.json().error)
          } else {
            console.log("return json=" + r.json());
            console.log("return imagePath = " + r.json().imageName);
            this.presentToast("Upload Success");
            this.navCtrl.pop();
          }
        }, err=> {
          console.log("api invoke err" + err);
        });
      })
      .catch((err) => console.log("file read err" + err));

    //
    // let url = "http://yoururl/upload.php";
    //
    // // File for Upload
    // let targetPath = this.pathForImage(this.lastImage);
    //
    // // File name only
    // let filename = this.lastImage;
    //
    //
    // let options = {
    //   fileKey: "file",
    //   fileName: filename,
    //   chunkedMode: false,
    //   mimeType: "multipart/form-data",
    //   params : {'fileName': filename}
    // };
    //
    // const fileTransfer: TransferObject = this.transfer.create();
    //
    // this.loading = this.loadingCtrl.create({
    //   content: 'Uploading...',
    // });
    // this.loading.present();
    //
    // // Use the FileTransfer to upload the image
    // fileTransfer.upload(targetPath, url, options).then(data => {
    //   this.loading.dismissAll();
    //   this.presentToast('Image succesful uploaded.');
    // }, err => {
    //   this.loading.dismissAll();
    //   this.presentToast('Error while uploading file.');
    // });
  }

}
