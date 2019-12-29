import { Injectable } from '@angular/core';
import { HealthKit } from '@ionic-native/health-kit/ngx';
import { ReadOnlyTypes, SupportedTypes} from '../interfaces/healthkit';
@Injectable({
  providedIn: 'root'
})
export class HealthkitService {
  supportedTypes;
  readOnlyTypes;
  
  constructor(private healthKit: HealthKit) {
    this.supportedTypes = SupportedTypes;
    this.readOnlyTypes = ReadOnlyTypes;
  }

  isAvailable() {
    return this.healthKit.available();
  }

  requestAuthorization() {
    return this.healthKit.requestAuthorization({
      readTypes: this.supportedTypes,
      writeTypes: this.supportedTypes
    });
  }

  isAuthorized() {
    return this.healthKit.checkAuthStatus({
      type: this.supportedTypes[0]
    });
  }

  getGender() {
    return this.healthKit.readGender();
  }

  getWeight() {
    return this.healthKit.readWeight({
      'requestWritePermission': false,
      'unit': 'kg' // m|cm|mm|in|ft
    });
  }

  saveWeight() {
    return this.healthKit.saveWeight({});
  }

  getDOB() {
    return this.healthKit.readDateOfBirth();
  }

  getHeight() {
    return this.healthKit.readHeight({
      'requestWritePermission': false,
      'unit': 'ft' // m|cm|mm|in|ft
    });
  }

  saveWorkout() {
    return this.healthKit.saveWorkout({});
  }

  querySampleType(options) {
    return this.healthKit.querySampleType(options);
  }

  querySampleTypeAggregated(options) {
    return this.healthKit.querySampleTypeAggregated(options);
  }

  saveQuantityKCAL(options) {
    return this.healthKit.saveQuantitySample(options)
  }

  sumQuantityType(options) {
    return this.healthKit.sumQuantityType(options);
  }
}
