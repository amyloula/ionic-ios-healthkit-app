import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor(private barcodeScanner: BarcodeScanner) { }

  scanItem() {
    this.barcodeScanner.scan()
    .then(barcodeData => {
      return barcodeData;
    }).catch(err => {
      return err;
    });
  }
}
