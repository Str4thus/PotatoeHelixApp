import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService, Endpoints } from '../api/api.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private _isAuthenticated: boolean;
  private token: string;

  constructor(private api: ApiService, private router: Router, private navCtrl: NavController,
    private storage: Storage) {

    this.storage.get("user-token")
      .then((token) => {
        if (token) {
          this.token = token;
          this.setupApiAuthorization();
        }
      });
  }

  private setupApiAuthorization() {
    this.api.addDefaultHeaders({
      'Authorization': 'Token ' + this.token
    })

    this.api.updateMediaRoot();
  }

  getToken(): string {
    return this.token;
  }

  canActivate() {
    return this.isAuthenticated();
  }

  async isAuthenticated(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get("user-token")
        .then(token => {
          this._isAuthenticated = token ? true : false;
          this._isAuthenticated ? this.navCtrl.navigateRoot(this.router.url) : this.navCtrl.navigateRoot("login");

          if (this._isAuthenticated && this.router.url == "/login")
            this.navCtrl.navigateRoot("");

          this.token = token;
        })

      resolve(this._isAuthenticated);
    });
  }

  async login(username: string, password: string): Promise<any> {
    let credentials = {
      username: username,
      password: password,
    }

    return this.api.post(Endpoints.getAuthTokenEndpoint(), credentials)
      .then((data) => {
        this.token = data["token"];
        this.storage.set("user-token", this.token);
        this.setupApiAuthorization();
      })
  }

  async logout(): Promise<any> {
    return this.storage.remove('user-token')
      .then(() => {
        this.token = null;
        this.setupApiAuthorization();
        this.navCtrl.navigateRoot("login");
      });
  }
}
