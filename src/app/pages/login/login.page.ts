import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private username: string;
  private password: string;
  private loginError: string;

  constructor(private authService: AuthService, private storage: Storage, private plt: Platform) {
    this.authService.canActivate();
  }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {

      this.authService.login(this.username, this.password).subscribe(
        data => {
          let parsedData = this.plt.is("cordova") ? JSON.parse(data.data) : data;
          this.storage.set("user-token", parsedData["token"]).then(() => {
            this.authService.canActivate();
          });
        },
        err => {
          switch (err.status) {
            case 400:
              this.loginError = "Benutzer existiert nicht!"
              break;
            default:
              this.loginError = "Ein unbekannter Fehler ist aufgetreten! (" + err.status + ")";
              break;
          }
        });
    }
  }
}
