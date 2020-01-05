import { Component } from "@angular/core";
import { HealthkitService } from "../services/healthkit.service";
import { DateUtilsService } from "../services/date-utils.service";
import {
  GenericResponse,
  StepCountResponse,
  HealthkitCard
} from "../interfaces/healthkit";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  height;
  weight;
  DOB: Date;
  available: boolean;
  authorized: string;
  access;
  stepCount;
  sleepAnalysis;
  today;
  tomorrow;
  midnightToday;
  midnightTomorrow;
  calories;
  ionCards: Array<HealthkitCard> = [];
  allowedMetrics: any;

  constructor(
    private healthkitService: HealthkitService,
    private dateUtils: DateUtilsService,
    private storageService: StorageService
  ) {
    this.setDates();
    this.getAllowedMetrics();
  }

  setDates() {
    this.midnightToday = this.dateUtils.midnightToday;
    this.midnightTomorrow = this.dateUtils.midnightTomorrow;
    this.today = this.dateUtils.today;
    this.tomorrow = this.dateUtils.tomorrow;
  }

  getAllowedMetrics() {
    this.storageService.permissions.subscribe((data: []) => {
      this.allowedMetrics = this.readAccessGranted(data);
    });
  }

  readAccessGranted(response) {
    return response.filter(element => {
      if (element.value && element.value.permissions.read) {
        return element;
      }
    });
  }

  isAvailable() {
    this.healthkitService.isAvailable().then(resp => (this.available = resp));
  }

  getHeight() {
    this.healthkitService
      .getHeight()
      .then((resp: GenericResponse) => (this.height = resp));
  }

  getWeight() {
    this.healthkitService
      .getWeight()
      .then(
        (weight: GenericResponse) => (this.weight = JSON.stringify(weight))
      );
  }

  getDOB() {
    this.healthkitService.getDOB().then(DOB => (this.DOB = DOB));
  }

  querySampleTypeAggregated() {
    this.healthkitService
      .querySampleTypeAggregated({
        startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        endDate: new Date(), // now
        aggregation: "day", // 'hour', 'week', 'year' or 'day', default 'day'
        sampleType: "HKQuantityTypeIdentifierStepCount", // any HKQuantityType
        unit: "count" // make sure this is compatible with the sampleType
      })
      .then(
        (resp: StepCountResponse) => (this.stepCount = JSON.stringify(resp))
      );
  }

  getSleepAnalysis() {
    this.healthkitService
      .querySampleType({
        startDate: new Date(), // three days ago
        endDate: new Date(), // now
        sampleType: "HKCategoryTypeIdentifierSleepAnalysis"
      })
      .then(resp => (this.sleepAnalysis = resp));
  }

  saveKCAL() {
    this.healthkitService
      .saveQuantityKCAL({
        startDate: new Date(), // now
        endDate: new Date(), // now
        sampleType: "HKQuantityTypeIdentifierDietaryEnergyConsumed", // make sure you request write access beforehand
        unit: "kcal",
        amount: 64
      })
      .then(resp => (this.calories = resp));
  }
}
