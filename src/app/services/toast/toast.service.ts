import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: 'tertiary',
    });

    toast.present();
  }

  async presentConfirmationToast(message: string, caller: {}, methodOnYes: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: 'tertiary',
      buttons: [
        {
          side: 'end',
          icon: 'cross',
          role: 'cancel',
          text: 'Abbrechen',
        },
        {
          text: 'OK',
          icon: 'tick',
          handler: () => {
            caller[methodOnYes]();
          }
        }
      ]
    });

    toast.present();
  }
}
