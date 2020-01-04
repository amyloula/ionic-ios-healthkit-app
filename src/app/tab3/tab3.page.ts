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
    this.setItems();
    this.updateDefaultPermissions();
  }

  updateDefaultPermissions() {
    this.ionItems = this.defaultItems.map((item) => {
      let updated = { ...item };
      this.getPermission(item.type)
        .then(val => {
          updated.permissions = val;
        });
        return updated;
    });
  }

  setItems() {
    this.defaultItems = this.healthkitTypes.map(({ title, type }) => {
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

}
