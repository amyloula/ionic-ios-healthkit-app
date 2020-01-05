import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {DoneConfig, ButtonConfig} from '../interfaces/toast';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showToast(message, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
  }

  async showToastWithOptions(header, message, position, buttonConfig, doneConfig: DoneConfig) {
    const toast = await this.toastController.create({
      header,
      message,
      position,
      buttons: [
        {
          side: buttonConfig.side,
          icon: buttonConfig.icon,
          text: buttonConfig.text,
          handler: () => buttonConfig.handler()
        }, {
          text: doneConfig.text,
          role: doneConfig.role,
          handler: () => doneConfig.handler()
        }
      ]
    });
    toast.present();
  }

}
