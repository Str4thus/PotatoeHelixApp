import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';


export class Endpoints {
  private static mediaRoot = ""; // gets updated, if the user is logged in

  static updateMediaRoot(newRoot: string): void {
    this.mediaRoot = newRoot;
  }

  static getApiRoot(): string {
    return "https://strathus-dev.me/"
  }

  static getAuthTokenEndpoint(): string {
    return "api-token-auth/";
  }

  static getBucketListEndpoint(): string {
    return "api/v1/buckets/";
  }

  static getBucketDetailsEndpoint(id: number): string {
    return "api/v1/buckets/" + id.toString() + "/";
  }

  static getMediaUrlQueryEndpoint(): string {
    return "api/v1/mediaurl/";
  }

  static getMediaRoot(): string {
    return this.getApiRoot() + this.mediaRoot;
  }

  static getImageListEndpoint(): string {
    return "api/v1/images/";
  }

  static getImageDetailEndpoint(id: number): string {
    return "api/v1/images/" + id.toString() + "/";
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot: string = Endpoints.getApiRoot();
  private defaultHeaders: {} = { 'Content-Type': 'application/json' };

  constructor(private browserHttp: HttpClient, private nativeHttp: HTTP, private plt: Platform) { }

  async get(endpoint: Endpoints | string, params: any = {}): Promise<any> {
    if (this.plt.is("cordova")) {
      let response = await this.nativeHttp.get(this.apiRoot + endpoint, params, this.defaultHeaders);
      response = JSON.parse(response.data);
      return new Promise((resolve, reject) => { resolve(response) })
    }
    return this.browserHttp.get(this.apiRoot + endpoint, { params: params, headers: this.defaultHeaders }).toPromise();
  }

  async post(endpoint: Endpoints | string, payload: any): Promise<any> {
    if (this.plt.is("cordova")) {
      let response = await this.nativeHttp.post(this.apiRoot + endpoint, payload, this.defaultHeaders);
      response = JSON.parse(response.data);
      return new Promise((resolve, reject) => { resolve(response) })
    }
    return this.browserHttp.post(this.apiRoot + endpoint, payload, { headers: this.defaultHeaders }).toPromise();
  }

  async patch(endpoint: Endpoints | string, payload: any): Promise<any> {
    if (this.plt.is("cordova")) {
      let response = await this.nativeHttp.patch(this.apiRoot + endpoint, payload, this.defaultHeaders);
      response = JSON.parse(response.data);
      return new Promise((resolve, reject) => { resolve(response) })
    }
    return this.browserHttp.patch(this.apiRoot + endpoint, payload, { headers: this.defaultHeaders }).toPromise();
  }

  async delete(endpoint: Endpoints | string, params: any = {}): Promise<any> {
    if (this.plt.is("cordova")) {
      let response = await this.nativeHttp.delete(this.apiRoot + endpoint, params, this.defaultHeaders);
      return new Promise((resolve, reject) => { resolve(response) })
    }
    return this.browserHttp.delete(this.apiRoot + endpoint, { params: params, headers: this.defaultHeaders }).toPromise();
  }

  addDefaultHeaders(additionalHeaders: {}): void {
    for (let key of Object.keys(additionalHeaders)) {
      if (this.defaultHeaders.hasOwnProperty(key))
        delete additionalHeaders[key]
    }

    this.defaultHeaders = { ...this.defaultHeaders, ...additionalHeaders };
  }

  updateMediaRoot() {
    this.get(Endpoints.getMediaUrlQueryEndpoint())
      .then(res => {
        Endpoints.updateMediaRoot(res);
      })
  }
}
