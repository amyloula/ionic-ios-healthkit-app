import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  permissions = [];

  getAllPermissions() {
    this.storage.forEach((value, key, index) => {
      this.permissions.push({key: key, value: value});
    });
    return this.permissions;
  }

  updatePermision(key, value) {
    return this.storage.set(key, value);
  }

  getPermission(key: string) {
    return this.storage.get(key);
  }

  clearPermission(key: string) {
    return this.storage.remove(key);
  }

}
