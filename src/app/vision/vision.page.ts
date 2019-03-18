import { Component, OnInit } from '@angular/core';
import { LoadingController} from '@ionic/angular';

import { Observable } from 'rxjs/Observable';
import { tap, filter } from 'rxjs/operators';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore} from 'angularfire2/firestore';



@Component({
  selector: 'app-vision',
  templateUrl: './vision.page.html',
  styleUrls: ['./vision.page.scss'],
})
export class VisionPage implements OnInit {

 // Upload task
 task: AngularFireUploadTask;
// Firestore data
 result$: Observable<any>;
 loading: LoadingController;
 image: string;



  constructor(private storage: AngularFireStorage, 
    private afs: AngularFirestore, 
    private camera: Camera,
    public loadingCtrl: LoadingController) {

      
   //  this.loading = this.loadingCtrl.create({
       // content: 'Running AI vision analysis...'
      //});
     }

     public async showLoader(){
     const openloader =await this.loadingCtrl.create({
      message: "Running AI Vision Analysis "

     });

      return await openloader.present();
      }


     
     startUpload(file: string) {

      // Show loader
      //this.loading.present();
  
      // const timestamp = new Date().getTime().toString();
      const docId = this.afs.createId();
  
      const path = `${docId}.jpg`;
  
      // Make a reference to the future location of the firestore document
      const photoRef = this.afs.collection('photos').doc(docId)
      
      // Firestore observable, dismiss loader when data is available
      this.result$ = photoRef.valueChanges()
          .pipe(
            filter(data => !!data),
            tap(_ => this.loading.dismiss())
          );
  
      
      // The main task
      this.image = 'data:image/jpg;base64,' + file;
      this.task = this.storage.ref(path).putString(this.image, 'data_url'); 
    }
  
    // Gets the pic from the native camera then starts the upload
    async captureAndUpload() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
  
      const base64 = await this.camera.getPicture(options)
  
      this.startUpload(base64);
    }

  ngOnInit() {
  }

}
