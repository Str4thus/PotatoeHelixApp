import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Platform, NavController } from '@ionic/angular';
import { ApiService, Endpoints } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public isAuthenticated: boolean;
  private token: string;

  constructor(private api: ApiService, private plt: Platform, private router: Router,
    private storage: Storage, private navCtrl: NavController) {
  }

  private isTokenPresent(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get("user-token").then(result => {
        this.isAuthenticated = result ? true : false;
        this.isAuthenticated ? this.router.navigate([this.router.url]) : this.router.navigate(["login"]);

        if (this.router.url == "/login")
          this.navCtrl.navigateRoot('bucket-overview');
          
        this.token = result;
      });

      resolve(this.isAuthenticated);
    });
  }

  getToken() {
    return this.token;
  }

  canActivate() {
    return this.isTokenPresent();
  }

  login(username: string, password: string): Observable<any> {
    let credentials = {
      username: username,
      password: password,
    }

    return this.api.post(Endpoints.AuthToken, credentials);
  }
}
