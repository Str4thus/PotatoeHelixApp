import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { HTTP } from '@ionic-native/http/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ApiService } from './services/api.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ImageModalPageModule } from './pages/image-modal/image-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule, HttpClientModule,
    IonicStorageModule.forRoot(), ImageModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    HTTP,
    ModalController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    FileTransfer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
