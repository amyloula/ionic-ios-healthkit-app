import { Component } from '@angular/core';
import { BarcodeScannerService } from '../services/barcode-scanner.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  barcodeItem;

  constructor(private barcodeScanner: BarcodeScannerService) { }


  scanItem() {
    this.barcodeItem = this.barcodeScanner.scanItem();
  }

}
