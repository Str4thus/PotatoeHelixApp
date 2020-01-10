import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Observable, from } from 'rxjs';


export enum Endpoints {
  ApiRoot = "https://strathus-dev.me/",

  AuthToken = "api-token-auth/",
  BucketList = "api/v1/buckets/",
  BucketDetails = "api/v1/buckets/",
  MediaUrl = "api/v1/mediaurl/",
  Images = "api/v1/images/",
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot: string = Endpoints.ApiRoot;
  private defaultHeaders: {} = { 'Content-Type': 'application/json' };
  private mediaRoot: string = null;

  constructor(private browserHttp: HttpClient, private nativeHttp: HTTP, private plt: Platform) { }

  get(endpoint: Endpoints | string, params: any = {}) {
    if (this.plt.is("cordova"))
      return from(this.nativeHttp.get(this.apiRoot + endpoint, params, this.defaultHeaders));
    return this.browserHttp.get(this.apiRoot + endpoint, { params: params, headers: this.defaultHeaders });
  }

  post(endpoint: Endpoints | string, payload: any) {
    if (this.plt.is("cordova"))
      return from(this.nativeHttp.post(this.apiRoot + endpoint, payload, this.defaultHeaders));
    return this.browserHttp.post(this.apiRoot + endpoint, payload, { headers: this.defaultHeaders });
  }

  patch(endpoint: Endpoints | string, payload: any): Observable<any> {
    if (this.plt.is("cordova"))
      return from(this.nativeHttp.patch(this.apiRoot + endpoint, payload, this.defaultHeaders));
    return this.browserHttp.patch(this.apiRoot + endpoint, payload, { headers: this.defaultHeaders });
  }

  delete(endpoint: Endpoints | string, params: any = {}): Observable<any> {
    if (this.plt.is("cordova"))
      return from(this.nativeHttp.delete(this.apiRoot + endpoint, params, this.defaultHeaders));
    return this.browserHttp.delete(this.apiRoot + endpoint, { params: params, headers: this.defaultHeaders });
  }

  addDefaultHeaders(additionalHeaders: {}): void {
    for (let key of Object.keys(additionalHeaders)) {
      if (this.defaultHeaders.hasOwnProperty(key))
        delete additionalHeaders[key]
    }

    this.defaultHeaders = { ...this.defaultHeaders, ...additionalHeaders };
  }

  updateMediaRoot() {
    this.get(Endpoints.MediaUrl).subscribe(res => {
      this.mediaRoot = this.plt.is("cordova") ? JSON.parse(res["data"]) as string : res as string;
    })
  }

  getMediaRoot(): string {
    return this.apiRoot + this.mediaRoot;
  }
}
