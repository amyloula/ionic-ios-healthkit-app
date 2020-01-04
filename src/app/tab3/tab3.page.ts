import { Component } from '@angular/core';
import { HKTypes } from '../interfaces/healthkit';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  defaultItems = [];
  ionItems = [];
  healthkitTypes = HKTypes;
  permissions = [];

  constructor(private storageService: StorageService, private toastService: ToastService) {
    this.setDefaults();
    this.updateDefaultPermissions();
  }

  updateDefaultPermissions() {
    this.ionItems = this.ionItems.map((item) => {
      let updated = { ...item };
      this.getPermission(item.type)
        .then(response => {
          if (this.isUndefinedOrNull(response)) {
            updated.permissions = item.permissions;
          } else {
            updated.permissions = response;
          }
        });
      return updated;
    });
    console.log(this.ionItems);
  }

  isUndefinedOrNull(value) {
    return (value === undefined || value === null);
  }

  setDefaults() {
    this.ionItems = this.healthkitTypes.map(({ title, type }) => {
      return {
        title,
        subtitle: '',
        type,
        value: '',
        permissions: {
          read: false,
          write: false
        }
      };
    });
  }

  toggleItem(item) {
    this.storageService.updatePermision(item.type, item.permissions)
      .then(() => this.toastService.showToast(`Changes saved to ${item.title}`));
  }

  getPermission(key) {
    return this.storageService.getPermission(key);
  }

  clearAllSettings() {
    let cancelConfig = { text: 'Cancel', role: 'cancel', handler: () => console.log('ok') };
    let confirmConfig = { side: 'bottom', icon: 'trash', handler: () => this.clearAll() };
    this.toastService.showToastWithOptions('Are you sure you want to clear all settings?', '', 'bottom', confirmConfig, cancelConfig);
  }

  clearAll() {
    this.storageService.clearAll().then(() => this.setDefaults());
  }
}
