import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private username: string;
  private password: string;


  constructor(private authService: AuthService, private loadingCtrl: LoadingController,
    private navCtrl: NavController, private toastService: ToastService) { }

  ngOnInit() { }

  async login() {
    if (this.username && this.password) {
      let loader = await this.loadingCtrl.create({
        message: "Einloggen...",
      })
      loader.present();

      this.authService.login(this.username, this.password)
        // success
        .then(() => {
          loader.dismiss();
          this.navCtrl.navigateRoot('bucket-overview');
        })
        // error
        .catch((err) => {
          loader.dismiss();

          switch (err.status) {
            case 400:
              this.toastService.presentToast("Authentifizierung fehlgeschlagen!");
              break;

            default:
              this.toastService.presentToast("Es ist ein Fehler aufgetreten. (ERR-3)");
              break;
          }
        })
    }
  }
}
